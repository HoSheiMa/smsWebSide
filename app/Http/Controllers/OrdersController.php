<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\orders;
use App\Models\sharetofriends;
use App\Models\codes;
use App\Models\systeminfo;
use App\Models\users as user;

class OrdersController extends Controller
{
    public function history(Request $request, $type, $number, $timeZone, $FromShareUrl = false, $key = null)
    {
        $m = new \Moment\Moment($timeZone); // default is "now" UTC
        $d = $m->format('Y-m-d');
        if ($FromShareUrl) {
            $data = sharetofriends::where('key', $key)->first();
            if ($data) {
                $email = $data->email;
                $user = user::where('email', $email)->first();
                $old_history = json_decode($user->history, true);
                // add or delete some message number
                $old_history["$d"] = isset($old_history["$d"]) ?  +$old_history["$d"] + $number : $number;
                $user->history = json_encode($old_history);
                $user->save();
            }
        }

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
    public function returnData()
    {
        $all = orders::all();

        for ($i = 0; $i < sizeof($all); $i++) {
            $m = $all[$i];
            orders::destroy($m->id);
        }
        return $all;
    }
    public function sendsmsCodeForget(Request $request)
    {
        $v = $request->validate([
            "email" => 'required',
        ]);

        $email = $v['email'];
        $user = user::where('email', $email)->get();
        if (!$user) {
            return array("success" => false);
        }
        $n = $user[0]->number;
        $newCode = new codes;
        $code = rand(41297, 445452);
        $t = 'Hi SMSWEB user, Your Forget Code is ' . $code;

        $newCode->Code = $code;
        $newCode->number = $n;
        $newCode->save();

        //order => to give order to send sms
        $OrderCode = new orders;
        $OrderCode->number = '001' . $n;
        $OrderCode->text = $t;
        $OrderCode->save();
    }
    public function sendsmsCode(Request $request)
    {
        $v = $request->validate([
            "n" => 'required',
            "PageId" => 'required',
        ]);

        $n = $v['n'];
        $PageId = $v['PageId'];
        $code = rand(41297, 445452);
        $t = 'Hi SMSWEB user, Your Virtify Code is ' . $code;

        // code
        $newCode = new codes;
        $newCode->pageId = $PageId;
        $newCode->Code = $code;
        $newCode->number = $n;
        $newCode->save();

        //order => to give order to send sms
        $OrderCode = new orders;
        $OrderCode->number = '001' . $n;
        $OrderCode->text = $t;
        $OrderCode->save();

        return;
    }
    public function AddNewSmsSended()
    {
        $today = date("n-j-Y");
        $old =  systeminfo::where('key', 'MessagesSendedToday')->first();
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
    public function sendsms(Request $request)
    {
        $v = $request->validate([
            "n" => 'required',
            "t" => 'required',
            "timeZone" => 'required',
        ]);

        $n = $v['n'];
        $t = $v['t'];
        $timezone = $v['timeZone'];
        $today = date("Fj,Y,g:ia");

        //checking is he has today sms
        $RemainsSms = $this->history(
            $request,
            'get',
            5,
            $timezone
        );

        if ($RemainsSms['today'] == 0) return abort(404, "You can't do it now! try again later.");



        //order => to give order to send sms
        $OrderCode = new orders;
        $OrderCode->number = '001' . $n;
        $OrderCode->text = $t;
        $OrderCode->save();

        $this->AddNewSmsSended();


        // remove one sms
        $this->history(
            $request,
            'post',
            -1,
            $timezone
        );
    }
    public function checkCodeForget(Request $request)
    {
        $v = $request->validate([
            "code" => "required",
            "pass" => "required",

        ]);
        $code = $v['code'];

        $cd =  codes::where('Code', $code)->get();
        $n = $cd[0]['number'];
        $found =   0 < sizeof($cd);
        if ($found) {
            codes::destroy($cd[0]['id']);
            /// create new user
            $newuser = user::where('number', $n)->first();
            $newuser->pass = $v['pass'];
            $newuser->save();
        }


        return $found ? array("success" => true) : array("success" => false);
    }
    public function checkCode(Request $request)
    {
        $v = $request->validate([
            "n" => 'required',
            "PageId" => 'required',
            "code" => "required",
            "fname" => "required",
            "email" => "required",
            "pass" => "required",
            "timezone" => "required",

        ]);
        $n = $v['n'];
        $PageId = $v['PageId'];
        $code = $v['code'];
        $timezone = $v['timezone'];

        $cd =  codes::where('pageId', $PageId)->where('number', $n)->where('Code', $code)->get();
        $found =   0 < sizeof($cd);

        if ($found) {
            codes::destroy($cd[0]['id']);
            /// create new user
            $newuser = new user;
            $newuser->fname = $v['fname'];
            $newuser->pass = $v['pass'];
            $newuser->email = $v['email'];
            $newuser->number = $v['n'];
            $newuser->save();
            $helper = $request->session()->get('HelperOrderId');
            $request->session()->forget('HelperOrderId');
            $this->history($request, 'post', +5, $timezone, true, $helper);
        }






        return $found ? array("success" => true) : array("success" => false);
    }
}
