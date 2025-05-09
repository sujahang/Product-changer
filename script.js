const scroll = new LocomotiveScroll({
    el: document.querySelector('#main'),
    smooth: true
});

// =============> loading anim
function firstPageAnim(){
    var tl = gsap.timeline();
    tl.from("#nav", {
        y: '-10',
        opacity: 0,
        duration: 1.3,
        ease: Expo.easeInOut
    })
    .to(".boundingElem", {
        y: 0,
        ease: Expo.easeInOut,
        duration: 2,
        delay: -1,
        stagger: .2  //for delay 
    })
    .from("#heroFooter", {
        y: -10,
        opacity: 0,
        duration: 1.5,
        delay: -1,
        ease: Expo.easeInOut
    })
}
//==============> circle size while moving function 
var timeout;

function circleMoveSize(){
    //define default scale value
    var xscale = 1;
    var yscale = 1;

    var xprev = 0;
    var yprev = 0;
    window.addEventListener("mousemove", function(dets){
        clearTimeout(timeout)
        xscale = gsap.utils.clamp(.8, 1.2, dets.clientX - xprev);
        yscale = gsap.utils.clamp(.8, 1.2, dets.clientY - yprev);
        
        xprev = dets.clientX;
        yprev = dets.clientY;

        circleMouseFollower(xscale, yscale)

        setTimeout(function(){
        timeout = document.querySelector("#mini_circle").style.transform = `translate(${dets.clientX}px, ${dets.clientY}px) scale(1, 1)`;
        })
    })
}


// ===========> circle mouse move function
function circleMouseFollower(xscale, yscale){
    window.addEventListener("mousemove", function(dets){
        document.querySelector("#mini_circle").style.transform = `translate(${dets.clientX}px, ${dets.clientY}px) scale(${xscale}, ${yscale})`;
    })
}

// =============> mouse move image function 
document.querySelectorAll(".element").forEach(function (element){
    var rotate = 0;
    var diffrot = 0;
    // ==========> mouse leave
    element.addEventListener("mouseleave",  function(details){
        gsap.to(element.querySelector("img"), {
            opacity: 0,
            ease: Power4,
            duration: 0.5,
        })
});

    // ===============> mouse move 
    element.addEventListener("mousemove",  function(details){
        // console.log(details.clientX, details.clientY)
        var diff = details.clientY - element.getBoundingClientRect().top;
        diffrot = details.clientX - rotate;
        rotate = details.clientX;
     
        gsap.to(element.querySelector("img"), {
            opacity: 1,
            ease: Power4,
            top: diff,
            left: details.clientX,
            rotate: gsap.utils.clamp(-20, 20, diffrot * 0.3),
        })
    })
});

circleMoveSize();
firstPageAnim()
circleMouseFollower();