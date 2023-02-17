import {updateBird,setupBird,getBirdRect} from "/bird.js"
import {updatePipes ,setupPipes ,getPassedCount,getPipeRects} from "/pipe.js"


document.addEventListener("keypress",handleStart,{once:true})
const title=document.querySelector("[data-title]")
const subtitle=document.querySelector("[data-subtitle]")

let lastTime;

function updateLoop(time)
{
    if(lastTime==null)
    {
        lastTime=time;
        window.requestAnimationFrame(updateLoop);
        return;
    }
    let delta=time-lastTime;
    if(checkLose())return handleLose();
    // console.log(delta);
    updateBird(delta);
    updatePipes(delta);
    lastTime=time;
    window.requestAnimationFrame(updateLoop);
}

function checkLose()
{
    const birdRect=getBirdRect();
    const insidePipe=getPipeRects().some(rect=> isCollision(birdRect, rect))
    const outsideWorld=(birdRect.top+10)<0 || (birdRect.bottom-10)>window.innerHeight
    return outsideWorld || insidePipe;
}

function isCollision(rect1,rect2)
{
    return (rect1.right)>(rect2.left) &&
           (rect1.bottom-15)>rect2.top &&
           (rect1.top+15)<rect2.bottom &&
           (rect1.left+20)<rect2.right
}
 
function handleStart()
{
    title.classList.add("hide");
    setupBird();
    setupPipes(); 
    lastTime=null;
    window.requestAnimationFrame(updateLoop) 
}

function handleLose()
{
    setTimeout(()=>
    {
    title.classList.remove("hide");
    subtitle.classList.remove("hide");
    const pipes=document.querySelectorAll(".pipe");
    pipes.forEach((pipe)=>{
        pipe.style.setProperty("--opacity","0.5")
    });
    subtitle.textContent=`${getPassedCount()} pipes`;
    document.addEventListener("keypress", handleStart, { once: true })
    }
    ,100);
}
