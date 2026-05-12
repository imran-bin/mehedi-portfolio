(function(){
  'use strict';
  // Scroll: navbar
  var nav=document.querySelector('.navbar');
  window.addEventListener('scroll',function(){
    if(window.scrollY>50){nav.classList.add('scrolled')}else{nav.classList.remove('scrolled')}
  });
  // Mobile menu toggle
  var toggle=document.getElementById('mobileToggle');
  var menu=document.getElementById('mobileMenu');
  if(toggle&&menu){
    toggle.addEventListener('click',function(){
      if(menu.style.display==='flex'){menu.style.display='none';toggle.textContent='☰'}
      else{menu.style.display='flex';toggle.textContent='✕'}
    });
    menu.querySelectorAll('a').forEach(function(a){a.addEventListener('click',function(){menu.style.display='none';toggle.textContent='☰'})});
  }
  // Smooth scroll
  document.querySelectorAll('a[href^="#"]').forEach(function(a){
    a.addEventListener('click',function(e){var t=document.querySelector(a.getAttribute('href'));if(t){e.preventDefault();t.scrollIntoView({behavior:'smooth',block:'start'})}})
  });
  // Scroll to top
  document.querySelectorAll('.nav-logo').forEach(function(l){l.addEventListener('click',function(){window.scrollTo({top:0,behavior:'smooth'})})});
  // Fade-in observer
  var obs=new IntersectionObserver(function(entries){entries.forEach(function(e){if(e.isIntersecting){e.target.classList.add('visible');obs.unobserve(e.target)}})},{threshold:0.1});
  document.querySelectorAll('.fade-in').forEach(function(el){obs.observe(el)});
  // Video modal
  var overlay=document.getElementById('videoOverlay');
  var iframe=document.getElementById('videoIframe');
  var modalTitle=document.getElementById('videoModalTitle');
  document.querySelectorAll('.video-card').forEach(function(card){
    card.addEventListener('click',function(){
      var url=card.getAttribute('data-embed');
      var title=card.getAttribute('data-title');
      iframe.src=url;
      modalTitle.textContent=title;
      overlay.style.display='flex';
    });
  });
  if(overlay){
    overlay.addEventListener('click',function(e){if(e.target===overlay){iframe.src='';overlay.style.display='none'}});
    document.getElementById('videoModalClose').addEventListener('click',function(){iframe.src='';overlay.style.display='none'});
    window.addEventListener('keydown',function(e){if(e.key==='Escape'&&overlay.style.display==='flex'){iframe.src='';overlay.style.display='none'}});
  }
  // FAQ accordion
  document.querySelectorAll('.faq-btn').forEach(function(btn){
    btn.addEventListener('click',function(){
      var ans=btn.nextElementSibling;
      var wasOpen=btn.classList.contains('open');
      document.querySelectorAll('.faq-btn').forEach(function(b){b.classList.remove('open');b.nextElementSibling.classList.remove('open')});
      if(!wasOpen){btn.classList.add('open');ans.classList.add('open')}
    });
  });
  // Problem form
  var form=document.getElementById('problemForm');
  var msg=document.getElementById('formMsg');
  if(form){form.addEventListener('submit',function(e){e.preventDefault();msg.style.display='block';form.reset();setTimeout(function(){msg.style.display='none'},4000)})}
  // Social icon hover
  document.querySelectorAll('.social-icon').forEach(function(i){
    i.addEventListener('mouseover',function(){i.style.background='var(--secondary)';i.style.borderColor='var(--secondary)';i.style.transform='translateY(-5px)'});
    i.addEventListener('mouseout',function(){i.style.background='rgba(255,255,255,0.03)';i.style.borderColor='rgba(255,255,255,0.08)';i.style.transform='translateY(0)'});
  });
})();