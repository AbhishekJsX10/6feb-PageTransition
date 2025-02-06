let lenis

function initalizelenis(){
    if(lenis){
        lenis.destroy()
    }
    lenis = new Lenis({
        autoRaf: true, 
        smoothWheel: true
    })
    function raf(time){
        lenis.raf(time)
        requestAnimationFrame(raf)
    }
    requestAnimationFrame(raf)
}



function initializeAnimations(){
    gsap.to(".link a",{
        y:0,
        duration:1,
        stagger: 0.1,
        ease:"power4.out",
        delay:1,

    })

    if(document.querySelector(".hero h1")){
        const heroText = new SplitType(".hero h1",{ type:"chars" })
        gsap.set(heroText.chars,{ y: 400 })
        gsap.to(heroText.chars,{
            y:0,
            duration: 1,
            stagger: 0.075,
            ease: "power4.out",
            delay: 1
        })
    }

    if(document.querySelector(".info p")){
        const text = new SplitType(".info p",{ 
            type:"lines", 
            tagName: "div", 
            lineClass:"line" 
        })
        
        text.lines.forEach((line)=>{
            const content = line.innerHTML;
            line.innerHTML = `<span>${content}</span>`;
        })

        gsap.set(".info p .line span",{
            y:200,
            display: "block",
        })

        gsap.to(".info p .line span",{
            y:0,
            duration: 1,
            stagger: 0.075,
            ease: "power4.out",
            delay: 1
        })
    }
}

document.addEventListener("DOMContentLoaded",()=>{
    initalizelenis()
    initializeAnimations()
})


if(navigation && document.startViewTransition){
    navigation.addEventListener("navigate",(event)=>{
        if(!event.destination.url.includes(document.location.origin)){
            return;
        }
        event.intercept({
            handler: async () => {
                const response = await fetch(event.destination.url);
                const text = await response.text();
                document.startViewTransition(()=>{
                    const body = text.match(/<body[^>]*>([\s\S]*)<\/body>/i)[1];
                    document.body.innerHTML = body;
                    const title = text.match(/<title[^>]*>(.*?)<\/title>/i)[1];
                    document.title = title;
                    window.scrollTo(0,0);
                    initializeAnimations();
                    initalizelenis();
                });
            },
            scroll: "manual"
        });
    });
}
