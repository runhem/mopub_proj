function Countdown () 
{
    this.startTime="00:10";
    this.target_id = "#timer";
    this.name="timer";
}


Countdown.prototype.init= function()
{
    this.reset();
    setInterval(this.name + '.tick()', 1000);
}

Countdown.prototype.reset = function()
{
    time=this.startTime.split(":");
    this.minutes=parseInt(time[0]);
    this.seconds=parseInt(time[1]);
    this.update_target();

}

Countdown.prototype.tick=function()
{
    if(this.seconds||this.minutes>0){
        this.seconds=this.seconds - 1;
        if(this.seconds==0){
            this.minutes=0;
            this.seconds=0;
            document.getElementById("timer").style.backgroundColor="red";
        }
    }
    this.update_target();
}

Countdown.prototype.update_target=function(){
    seconds = this.seconds;
    if(seconds<10) seconds="0"+seconds;
    $(this.target_id).val(this.minutes+":"+seconds)
}