<?php

use App\Http\Controllers\admin;
use Illuminate\Support\Facades\Route;
use Illuminate\Http\Request;

use App\Http\Controllers\OrdersController;
use App\Http\Controllers\users;
/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

// Pages
Route::get('/', function () {
    return view('welcome');
});
Route::get('/Register', function (Request $request) {
    $HelperOrderId = $request->input('key');
    $request->session()->put('HelperOrderId', $HelperOrderId);
    return view('welcome');
});
Route::get('/login', function () {
    return view('welcome');
});
Route::get('/dashboard', function () {
    return view('welcome');
});
Route::get('/test/mail', function () {
    return view('Mail');
});

// API
Route::get('/getorders', [OrdersController::class, 'returnData']);
Route::get('/sendsmsCode', [OrdersController::class, 'sendsmsCode']);
Route::post('/sendsms', [OrdersController::class, 'sendsms']);
Route::get('/sendsmsCodeForget', [OrdersController::class, 'sendsmsCodeForget']);
Route::post('/checkCode', [OrdersController::class, 'checkCode']);
Route::get('/checkCodeForget', [OrdersController::class, 'checkCodeForget']);
Route::post('/loginapi', [users::class, 'login']);
Route::post('/logOut', [users::class, 'logOut']);
Route::post('/isLogin', [users::class, 'isLogin']);
Route::post('/smsRemains', [users::class, 'smsRemains']);
Route::post('/profile/get', [users::class, 'GetProfile']);
Route::post('/get/products', [users::class, 'products']);
Route::post('/profile/post', [users::class, 'PostProfile']);
Route::post('/profile/ownlink', [users::class, 'ownlink']);
Route::post('/contectUs/send', [users::class, 'SendEmail']);
Route::post('/Home/FooterData', [users::class, 'FooterData']);
// admin system
Route::post('/admin/dashbourd/get/home/info', [admin::class, 'getHomeInfo']);
Route::post('/admin/dashbourd/get/users/info', [admin::class, 'getUsersInfo']);
Route::post('/admin/dashbourd/get/users/delete', [admin::class, 'deleteUser']);
Route::post('/admin/dashbourd/get/users/add', [admin::class, 'addNewUser']);
Route::post('/admin/dashbourd/Footer/post', [admin::class, 'FooterPost']);
Route::post('/admin/dashbourd/Top/UsersCodes', [admin::class, 'TopUsersCodes']);
Route::post('/admin/dashbourd/Top/multiSend', [admin::class, 'multiSend']);
Route::post('/admin/dashbourd/get/Product/delete', [admin::class, 'ProductUser']);
Route::post('/admin/dashbourd/get/Product/post', [admin::class, 'Productpost']);
