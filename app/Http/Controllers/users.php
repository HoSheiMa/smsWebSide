<?php

namespace App\Http\Controllers;


use App\Mail\ContectUs;
use Illuminate\Http\Request;
use App\Models\users as user;
use App\Models\systeminfo as systeminfo;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Validator;
use App\Models\sharetofriends;


include 'Library/vendor/autoload.php';

use \Moment\Moment;


class users extends Controller
{



    public function FooterData(Request $request)
    {
        return systeminfo::where('key', 'FooterData')->first()->value;
    }
    public function products(Request $request)
    {
        return systeminfo::where('key', 'products')->first()->value;
    }
    public function ownlink(Request $request)
    {

        $s = $this->isLogin($request);
        if ($s['Login']) {
            // checking time zone
            $IsMyLinkExistInshareTofriends = shareTofriends::where('email', $s['email'])->first();
            if ($IsMyLinkExistInshareTofriends) {
                $key = $IsMyLinkExistInshareTofriends->key;
            } else {
                $key = $s['email'] . 'key' . rand(0, 999999999);
                $newLink = new shareTofriends;
                $newLink->email = $s['email'];
                $newLink->key = $key;
                $newLink->timeZone = $s['timezone'];
                $newLink->save();
            }
            return array(
                "link" => url('') . "/Register?key=" . $key
            );
        } else {
            return array(
                "link" => 'Login First to get it bro..'
            );
        }
    }
    public function smsRemains(Request $request)
    {
        $timeZone = $request->input('timezone');
        if ($timeZone) {
            return $this->history($request, 'get', +5, $timeZone);
        }
    }

    public function SendEmail(Request $request)
    {
        $v = $request->validate([
            "email" => "required",
            "message" => "required",
            "subject" => "required",
            "name" => "required",
        ]);

        Mail::to('qandilafa@gmail.com')->send(new ContectUs([
            "email" => $v['email'],
            "messageText" =>  $v['message'],
            "subject" =>  $v['subject'],
            "name" =>  $v['name']
        ]));
        return array("success" => true);
    }
    public function GetProfile(Request $request)
    {
        $s = $this->isLogin($request);
        $id = $request->input('id');

        if ($s['Login']) {
            if (isset($id)  && $s['isAdmin'] == "true") {
                $user = user::find($id);
            } else {
                $user = user::where('email', $s['email'])->first();
            }

            $fname = $user->fname;
            $email = $user->email;
            $number =  $user->number;
            $block =  $user->block;
            return array("block" => $block, "fname" => $fname, "email" => $email, "number" => $number, "success" => true);
        }
        return array("success" => false);
    }
    public function PostProfile(Request $request)
    {
        $s = $this->isLogin($request);
        if ($s['Login']) {
            if ($s['isAdmin'] == "true") {
                $v = $request->validate([
                    "email" => "required",
                    "fname" => "required",
                    "number" => "required",
                    "block" => "required",
                    "id" => "required",
                ]);
            } else {

                $v = $request->validate([
                    "email" => "required",
                    "fname" => "required",
                ]);
            }

            $p = Validator::make($request->all(), [
                'pass' => 'required',
            ]);

            $e = $v["email"];
            $n = $v["fname"];
            $number = $v["number"];
            $block = $v["block"];
            $id = $v["id"];


            if (isset($id)  && $s['isAdmin'] == "true") {
                $user = user::find($id);
            } else {
                $user = user::where('email', $s['email'])->first();
            }
            $user->fname = $n;
            $user->email = $e;
            $user->number = $number;
            $user->block = $block;
            if (!$p->fails()) {
                $pass = $request->input('pass');
                $user->pass = $pass;
            }
            $user->save();
            return array("fname" => $n, "email" => $e, "success" => true);
        }
        return array("success" => false);
    }
    public function history(Request $request, $type, $number, $timeZone)
    {
        $m = new \Moment\Moment($timeZone); // default is "now" UTC
        $d = $m->format('Y-m-d');

        if ($request->session()->get('login')) {
            $user = user::where('email', $request->session()->get('email'))->first();
            $old_history = json_decode($user->history, true);
            if ($type == "post") {
                // add or delete some message number
                $old_history["$d"] = isset($old_history["$d"]) ?  +$old_history["$d"] + $number : $number;
                $user->history = json_encode($old_history);
                $user->save();
            } else {
                // get info and if not exist add the 5 of this new day
                $old_history["$d"] = !isset($old_history["$d"]) ?   $number : $old_history["$d"];
                $user->history = json_encode($old_history);
                $user->save();
                return array("today" => $old_history["$d"], "date" => "$d");
            }
        }
    }
    public function logOut(Request $request)
    {
        $request->session()->forget("login");
        $request->session()->forget("email");
        $request->session()->forget("timezone");
        $request->session()->forget("isAdmin");
    }
    public function AddNewLogin()
    {
        $today = date("n-j-Y");
        $old =  systeminfo::where('key', 'LoginToday')->first();
        $josn = json_decode($old->value, true);
        if (isset($josn["$today"])) {
            $josn["$today"] = +$josn["$today"] + 1;
        } else {
            $josn["$today"] = 1;
        }
        $josn = json_encode($josn);
        $old->value = $josn;
        $old->save();
    }

    public function login(Request $request)
    {
        $v = $request->validate([
            "email" => "required",
            "pass" => "required",
            "timezone" => 'required'
        ]);

        $timezone = $v['timezone'];


        $e = $v['email'];
        $p = $v['pass'];

        $found = user::where('email', $e)->where('block', 'false')->where('pass', $p)->first();

        if ($found) {
            $this->AddNewLogin();
            $request->session()->put("login", "true");
            $request->session()->put("email", "$e");
            $request->session()->put("timezone", "$timezone");
            $request->session()->put("isAdmin", $found["isAdmin"]);
        }
        if ($timezone) {
            $this->history($request, 'get', +5, $timezone);
        }
        return $found ? array("success" => true) : array("success" => false);
    }
    public function isLogin(Request $request)
    {

        $timeZone = $request->input('timezone');


        if ($timeZone) {
            $this->history($request, 'get', +5, $timeZone);
        }


        if ($request->session()->get('login') && $request->session()->get('isAdmin') && $request->session()->get('login') == "true" && $request->session()->get('email') && $request->session()->get('timezone')) {
            $e = $request->session()->get('email');
            $timezone = $request->session()->get('timezone');

            return array("timezone" => $timezone, "Login" => true, "isAdmin" => $request->session()->get('isAdmin'), "email" => $e);
        }
        return array("Login" => false, "isAdmin" => "false", "email" => null,);
    }
}
