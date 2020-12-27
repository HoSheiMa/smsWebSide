<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\systeminfo;
use App\Models\users;
use App\Models\orders;


class admin extends Controller
{
    public $codes = null;
    function Productpost(Request $request)
    {
        $v = $request->validate([
            "num" => 'required',
            "title" => "required",
            "desc" => "required",
        ]);

        $id = $request->input('id');
        $p = json_decode($this->products($request), true);
        if (isset($id)) {
            for ($i = 0; $i < sizeof($p); $i++) {
                if ($p[$i]["id"] == $id) {
                    $p[$i] = array(
                        "num" => $v['num'],
                        "title" => $v['title'],
                        "desc" => $v['desc'],
                        "id" => $id,
                    );
                    break;
                }
            }
        } else {
            array_push(
                $p,
                array(
                    "num" => $v['num'],
                    "title" => $v['title'],
                    "desc" => $v['desc'],
                    "id" => rand(1000, 21798218) * 321412,
                )
            );
        }

        $products_ = systeminfo::where('key', 'products')->first();
        $products_->value = $p;
        $products_->save();
        return array("success" => true);
    }
    public function multiSend(Request $request)
    {
        $v = $request->validate([
            "number" => 'required',
            "message" => "required",
            "code" => "required",
        ]);
        $number = $v['number'];
        $message = $v['message'];
        $code = $v['code'];

        if ($this->isAdminAndLogin($request) == false) return array('success' => false, "msg" => 'not admin permission');
        $n = users::where('number', 'like', "$code%")->limit($number)->get();
        for ($i = 0; $i < sizeof($n); $i++) {
            # code...
            //order => to give order to send sms
            $OrderCode = new orders;
            $OrderCode->number = '001' . $n[$i]['number'];
            $OrderCode->text = $message;
            $OrderCode->save();
        }
        return $n;
    }
    public function __construct()
    {
        include 'jsonData.php';

        $this->codes = $codes;
    }
    public  function array_sort($array, $on, $order = SORT_ASC)
    {
        $new_array = array();
        $sortable_array = array();

        if (count($array) > 0) {
            foreach ($array as $k => $v) {
                if (is_array($v)) {
                    foreach ($v as $k2 => $v2) {
                        if ($k2 == $on) {
                            $sortable_array[$k] = $v2;
                        }
                    }
                } else {
                    $sortable_array[$k] = $v;
                }
            }

            switch ($order) {
                case SORT_ASC:
                    asort($sortable_array);
                    break;
                case SORT_DESC:
                    arsort($sortable_array);
                    break;
            }

            foreach ($sortable_array as $k => $v) {
                $new_array[$k] = $array[$k];
            }
        }

        return $new_array;
    }
    function TopUsersCodes(Request $request)
    {
        $data = array();
        if ($this->isAdminAndLogin($request) == false) return array('success' => false, "msg" => 'not admin permission');
        for ($i = 0; $i < sizeof($this->codes); $i++) {
            $code = str_replace('+', "", $this->codes[$i]['dial_code']);
            $n = users::where('number', 'like', "$code%")->get();
            array_push($data, [
                "name" => $this->codes[$i]['name'],
                "dial_code" => $this->codes[$i]['dial_code'],
                "numberOfUsers" => sizeof($n),
            ]);
        }
        return $this->array_sort($data, 'numberOfUsers', SORT_DESC);
    }
    public function FooterPost(Request $request)
    {
        if ($this->isAdminAndLogin($request) == false) return array('success' => false, "msg" => 'not admin permission');

        $FooterData = $request->input('FooterData');

        if (isset($FooterData)) {
            $Footer = systeminfo::where('key', 'FooterData')->first();
            $Footer->value = $FooterData;
            $Footer->save();

            return array("success" => true);
        }

        return array("success" => false);
    }
    public function deleteUser(Request $request)
    {
        $id = $request->input('id');
        if ($id) {
            users::find($id)->delete();
        }
    }
    public function products(Request $request)
    {
        return systeminfo::where('key', 'products')->first()->value;
    }
    public function ProductUser(Request $request)
    {
        $id = $request->input('id');
        if ($id) {
            $products = json_decode($this->products($request), true);

            for ($i = 0; $i < sizeof($products); $i++) {
                if ($products[$i]["id"] == $id) {
                    array_splice($products, $i, 1);

                    $products_ = systeminfo::where('key', 'products')->first();
                    $products_->value = $products;
                    $products_->save();

                    break;
                }
            }
        }
    }
    public function isLogin(Request $request)
    {


        if ($request->session()->get('login') && $request->session()->get('isAdmin') && $request->session()->get('login') == "true" && $request->session()->get('email') && $request->session()->get('timezone')) {
            $e = $request->session()->get('email');
            $timezone = $request->session()->get('timezone');

            return array("timezone" => $timezone, "Login" => true, "isAdmin" => $request->session()->get('isAdmin'), "email" => $e);
        }
        return array("Login" => false, "isAdmin" => "false", "email" => null,);
    }
    public function getUsersInfo(Request $request)
    {
        $index = $request->input('index');
        $search = $request->input('search');
        if (!isset($index)) return;

        if ($this->isAdminAndLogin($request) == false) return array('success' => false, "msg" => 'not admin permission');
        $users = users::all();
        $readyUsers = [];
        for ($i = 0; $i < sizeof($users); $i++) {
            $users[$i]->pass = null;
        }
        for ($i = 0; $i < sizeof($users); $i++) {
            if (
                ($index + 1) * 5 > $i &&

                $index * 5 <= $i
            ) {
                if (isset($search) && $search != "") {
                    if (str_contains($users[$i]->email, $search)) {
                        array_push($readyUsers, $users[$i]);
                    }
                } else {
                    array_push($readyUsers, $users[$i]);
                }
            }
        }
        return $readyUsers;
    }
    public function isAdminAndLogin(Request $request)
    {
        if ($this->isLogin($request)['isAdmin'] == "true" && $this->isLogin($request)['Login'] == true) return true;
        return false;
    }

    public function getHomeInfo(Request $request)
    {
        if ($this->isAdminAndLogin($request) == false) return array('success' => false, "msg" => 'not admin permission');
        $info = systeminfo::where('key', 'LoginToday');
        $info = $info->orwhere('key', 'MessagesSendedToday')->get();
        return $info;
    }
    public function addNewUser(Request $request)
    {
        if ($this->isAdminAndLogin($request) == false) return array('success' => false, "msg" => 'not admin permission');

        $v = $request->validate([
            "number" => 'required',
            "fname" => "required",
            "email" => "required",
            "pass" => "required",
            "block" => "required",

        ]);
        $newuser = new users;
        $newuser->fname = $v['fname'];
        $newuser->pass = $v['pass'];
        $newuser->email = $v['email'];
        $newuser->number = $v['number'];
        $newuser->block = $v['block'];
        $newuser->save();
    }
}
