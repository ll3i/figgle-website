// Figgle ���� �ڹٽ�ũ��Ʈ ����

document.addEventListener('DOMContentLoaded', () => {
  // 스크롤 애니메이션 효과
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.1 });

  // 애니메이션 대상 요소들
  const animatedElements = document.querySelectorAll('.feature, .benefit-item, .testimonial, .pricing-plan');
  animatedElements.forEach(el => {
    el.classList.add('animate-on-scroll');
    observer.observe(el);
  });

  // 네비게이션 스크롤 처리
  const navLinks = document.querySelectorAll('nav a[href^="#"]');
  navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      
      const targetId = this.getAttribute('href');
      const targetElement = document.querySelector(targetId);
      
      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 80,
          behavior: 'smooth'
        });
      }
    });
  });

  // 모바일 메뉴 처리 (필요시 구현)
  const addMobileMenuToggle = () => {
    const header = document.querySelector('header');
    const nav = document.querySelector('nav');
    
    // 모바일 메뉴 버튼 추가
    const mobileMenuBtn = document.createElement('button');
    mobileMenuBtn.classList.add('mobile-menu-btn');
    mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
    mobileMenuBtn.style.display = 'none';
    
    // 창 크기가 작을 때 버튼 표시
    const checkWindowSize = () => {
      if (window.innerWidth <= 768) {
        mobileMenuBtn.style.display = 'block';
        nav.classList.add('mobile-nav');
      } else {
        mobileMenuBtn.style.display = 'none';
        nav.classList.remove('mobile-nav');
        nav.classList.remove('active');
      }
    };
    
    // 버튼 클릭시 메뉴 토글
    mobileMenuBtn.addEventListener('click', () => {
      nav.classList.toggle('active');
    });
    
    // 초기화
    header.insertBefore(mobileMenuBtn, nav);
    checkWindowSize();
    
    // 화면 크기 변경 감지
    window.addEventListener('resize', checkWindowSize);
  };
  
  // 필요시 모바일 메뉴 토글 기능 활성화
  // addMobileMenuToggle();

  // 문의하기 폼 처리
  const contactForm = document.querySelector('.contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      // 간단한 폼 유효성 검사
      const name = this.querySelector('#name').value.trim();
      const email = this.querySelector('#email').value.trim();
      const message = this.querySelector('#message').value.trim();
      
      if (!name || !email || !message) {
        alert('모든 필드를 입력해주세요.');
        return;
      }
      
      if (!isValidEmail(email)) {
        alert('유효한 이메일 주소를 입력해주세요.');
        return;
      }
      
      // 폼 제출 성공 시 메시지
      alert('메시지가 성공적으로 전송되었습니다. 곧 연락드리겠습니다.');
      this.reset();
    });
  }
  
  // 이메일 유효성 검사 함수
  function isValidEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }

  // CSS 애니메이션을 위한 스타일 추가
  const style = document.createElement('style');
  style.textContent = `
    .animate-on-scroll {
      opacity: 0;
      transform: translateY(20px);
      transition: opacity 0.6s ease, transform 0.6s ease;
    }
    .animate-on-scroll.visible {
      opacity: 1;
      transform: translateY(0);
    }
    .mobile-nav {
      display: none;
    }
    .mobile-nav.active {
      display: flex;
      flex-direction: column;
      position: absolute;
      top: 100%;
      left: 0;
      right: 0;
      background-color: var(--primary-color);
      padding: 1rem;
      box-shadow: 0 10px 20px rgba(0,0,0,0.1);
    }
    .mobile-menu-btn {
      background: none;
      border: none;
      color: white;
      font-size: 1.5rem;
      cursor: pointer;
    }
    @media (max-width: 768px) {
      .mobile-nav {
        display: none;
      }
      .mobile-nav.active {
        display: flex;
      }
    }
  `;
  document.head.appendChild(style);
});
