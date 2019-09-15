/*
 * @Description: Auto.js学习强国助手 (6+6)+(6+6)+(1+1)=26分
 * @version: 2.0
 * @Author: Ivan
 * @Date: 2019-09-06
 */

var aCount=6;//文章学习篇数
var vCount=16;//视频学习个数
var cCount=2;//收藏分享次数

var aTime=120000;//每篇文章学习-120秒
var vTime=75000;//每个视频学习-75秒
var wTime=5000;//等待强国app启动完毕的时间-5秒

/*
 * @description: 文章学习函数  (阅读文章+文章学习时长)---6+6=12分
 * @param: null
 * @return: null
 */
function articleStudy()
{
    while(!desc("学习").exists());//等待加载出主页
    desc("学习").click();//点击主页正下方的"学习"按钮
    sleep(2000);
    //var arr=["要闻","新思想","发布","实践","教育","人事","法纪","国际","纪实","时评","思考"]
    //var num=Math.round(Math.random()*10);
	//click(arr[num]);
    click("要闻");//点击要闻
    sleep(2000);

    var listView=className("ListView");//获取文章ListView控件用于翻页
    for(var i=0,t=0;i<aCount;)
    {
        //var a=className("FrameLayout").depth(21).row(i).findOne();//第一篇文章所在控件 (该方法有bug弃用,用下面方法点击文章)
        //a.click();
        if(click("“学习强国”学习平台",t)==true)//如果点击成功则进入文章页面,不成功意味着本页已经到底,要翻页
        {
            toast("正在学习第"+(i+1)+"篇文章");
            sleep(aTime);//学习120秒
            back();//返回要闻界面
            sleep(2000);
            i++;
            t++;//t为实际点击的文章在listView控件中的标号,和i不同,勿改动!
        }
        else{
            listView.scrollForward();//向下滑动(翻页)
            sleep(2000);
            t=0;
        }
    }
}

/*
 * @description: 视频学习函数  (视听学习+视听学习时长)---6+6=12分
 * @param: null
 * @return: null
 */
function videoStudy()
{
    click("电视台");//点击主页正下方的"电视台"按钮 (1.0版本为"视听学习")
    sleep(2000);
    click("联播频道");//点击联播频道看新闻联播
    sleep(2000);
    var listView=className("ListView");//获取listView视频列表控件用于翻页
    for(var i=0,t=0;i<vCount;)
    {
        if(click("央视网",t)==true)
        {
            toast("正在学习第"+(i+1)+"个视频");
            sleep(vTime);//每个视频学习秒
            back();//返回联播频道界面
            sleep(2000);
            i++;
            t++;
        }
        else
        {
            listView.scrollForward();//翻页
            sleep(2000);
            t=0;
        }
    }
}

/*
 * @description: 视频收藏加分享函数  (收藏+分享)---1+1=2分
 * @param: null
 * @return: null
 */
function videoCollectAndShare()
{
    //click("电视台");//点击主页正下方电视台按钮 (1.0版本为"视听学习")
    //sleep(2000);
    //click("联播频道");//看新闻联播
    //sleep(2000);
    for(var i=0;i<cCount;i++)
    {
        click("央视网",i);
        sleep(2000);
        toast("正在收藏和分享第"+(i+1)+"个视频");
        var collectIcon = classNameContains("ImageView").depth(10).findOnce(0);//右下角收藏按钮
        collectIcon.click();
        sleep(1000);

        var shareIcon = classNameContains("ImageView").depth(10).findOnce(1);//右下角分享按钮
        shareIcon.click();
        while(!textContains("分享给微信").exists());//等待弹出分享选项界面
        sleep(2000);
        click("分享给微信\n好友");
        while(!text("多选").exists());//等待跳转到微信界面(微信界面含有"多选"字样)
        sleep(2000);
        back();//跳转到微信之后返回就行了,算一次分享
        sleep(2000);
        
        back();//返回联播频道界面
        sleep(2000);
    }
}

function main()
{
    auto.waitFor();//等待获取无障碍辅助权限
    toast("学习强国助手启动中");
    if(!launchApp("学习强国"))//启动学习强国app
    {
        toast("找不到学习强国App!")
    }
    sleep(wTime);//等应用启动完毕

    articleStudy();//文章学习
    videoStudy();//视频学习
    videoCollectAndShare();//视频收藏与分享

    toast("运行结束");
} 

main();
