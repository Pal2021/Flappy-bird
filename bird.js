const birdElem=document.querySelector("[data-bird]");
const BIRD_SPEED=1.4
const JUMP_DURATION=125
let timeSinceLastJump=Number.POSITIVE_INFINITY;

export function updateBird(delta)
{
    console.log(delta);
    if(timeSinceLastJump<JUMP_DURATION)
    {
        setTop(getTop() - BIRD_SPEED * delta* 0.3); //Going Up
    }
    else
    {
        setTop(getTop() + BIRD_SPEED * delta * 0.3); //Going Down
    }
    timeSinceLastJump+=delta
}

export function getBirdRect()
{
    return birdElem.getBoundingClientRect();
}
export function setupBird()
{
    setTop(window.innerHeight / 2);
    document.removeEventListener("keydown",handleJump);
    document.addEventListener("keydown",handleJump);
}

function setTop(top)
{
    // console.log(top);
    birdElem.style.setProperty("--bird-top",top)
}

function getTop()
{
    return parseFloat(getComputedStyle(birdElem).getPropertyValue("--bird-top"))
}

function handleJump(e)
{
    if(e.code!=="Space")return;
    timeSinceLastJump=0;
}