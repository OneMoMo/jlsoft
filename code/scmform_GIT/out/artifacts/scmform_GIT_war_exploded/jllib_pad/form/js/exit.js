/* 此JS为 App中退出使用 */
var c1c = 0;
window.uexOnload = function(type){

    uexWindow.setReportKey(0,1);
    uexWindow.onKeyPressed = function(){ 
        if (c1c > 0) {
            uexWidgetOne.exit(0);
        }
        else {
            uexWindow.toast(0, 5, '再按一次退出应用', 1000); 
            c1c=1; setTimeout(function(){ c1c=0; }, 2000);
        }
    };
}