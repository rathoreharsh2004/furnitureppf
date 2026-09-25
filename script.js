window.addEventListener("load",()=>setTimeout(()=>document.querySelector(".preloader").classList.add("hide"),600));

const navbar=document.getElementById("navbar");
window.addEventListener("scroll",()=>navbar.classList.toggle("scrolled",scrollY>45));

const menuBtn=document.getElementById("menuBtn");
const nav=document.getElementById("navLinks");
menuBtn.addEventListener("click",()=>nav.classList.toggle("active"));
document.querySelectorAll("#navLinks a").forEach(a=>a.addEventListener("click",()=>nav.classList.remove("active")));

const observer=new IntersectionObserver(entries=>{
  entries.forEach(e=>{
    if(e.isIntersecting){e.target.classList.add("visible");observer.unobserve(e.target)}
  })
},{threshold:.12});
document.querySelectorAll(".reveal,.reveal-left,.reveal-right").forEach(el=>observer.observe(el));

document.querySelectorAll(".magnetic").forEach(el=>{
  el.addEventListener("mousemove",e=>{
    const r=el.getBoundingClientRect();
    el.style.transform=`translate(${(e.clientX-r.left-r.width/2)*.12}px,${(e.clientY-r.top-r.height/2)*.12}px)`;
  });
  el.addEventListener("mouseleave",()=>el.style.transform="translate(0,0)");
});

const stats=document.querySelector(".stats");
let counted=false;
const countObserver=new IntersectionObserver(entries=>{
  if(entries[0].isIntersecting&&!counted){
    counted=true;
    document.querySelectorAll(".counter").forEach(c=>{
      const target=+c.dataset.target; let n=0; const step=Math.max(1,Math.ceil(target/50));
      const run=()=>{n+=step;if(n>=target){c.textContent=target+"+";return}c.textContent=n;requestAnimationFrame(run)};run();
    });
  }
},{threshold:.3});
if(stats)countObserver.observe(stats);

document.querySelectorAll(".faq-item button").forEach(btn=>{
  btn.addEventListener("click",()=>{
    const item=btn.parentElement, active=item.classList.contains("active");
    document.querySelectorAll(".faq-item").forEach(x=>{x.classList.remove("active");x.querySelector("button span").textContent="+"});
    if(!active){item.classList.add("active");btn.querySelector("span").textContent="−"}
  });
});

document.getElementById("contactForm").addEventListener("submit",e=>{
  e.preventDefault();
  const name=document.getElementById("name").value.trim();
  const phone=document.getElementById("phone").value.trim();
  const type=document.getElementById("type").value;
  const message=document.getElementById("message").value.trim();
  const text=`Hello Furniture PPF,

I want to enquire about furniture protection.

Name: ${name}
Phone: ${phone}
Furniture Type: ${type}

Details:
${message||"I would like to discuss my furniture protection requirement."}

Please let me know the next steps.`;
  window.open("https://wa.me/918623093742?text="+encodeURIComponent(text),"_blank");
});

document.getElementById("year").textContent=new Date().getFullYear();
