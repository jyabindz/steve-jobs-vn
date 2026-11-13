/* ==========================================================================
   Apple.com Homepage — scripts/main.js
   Interactivity:
   1. Mobile Navbar Menu Toggle (<= 833px) & Curtain Handling
   2. Mega Menu 3-Column Desktop Dropdowns (debounce, focusin/out, curtain)
   3. Holiday 2026 Hero Variant Switcher (pink, blue, green, yellow, tokens)
   4. Apple TV+ Streaming Carousel (#tv-media-gallery: 9 slides, transform layout,
      exposed side slides, dotnav, 4s auto-advance, play/pause, touch swipe)
   ========================================================================== */

(function () {
  'use strict';

  /* ------------------------------------------------------------------------
     1. Mobile Navbar Menu Toggle & Curtain
     ------------------------------------------------------------------------ */
  function initNavbar() {
    var nav = document.getElementById('globalnav');
    if (!nav) return;

    var toggleBtn =
      nav.querySelector('#globalnav-menutrigger-button') ||
      nav.querySelector('#globalnav-menutrigger') ||
      nav.querySelector('.globalnav-menutrigger-button') ||
      nav.querySelector('[data-globalnav-toggle]') ||
      nav.querySelector('button[aria-controls]');

    var curtain =
      document.querySelector('.globalnav-curtain') ||
      nav.querySelector('.globalnav-curtain');

    if (!toggleBtn) return;

    function isOpen() {
      return (
        nav.classList.contains('globalnav-opened') ||
        nav.classList.contains('is-open') ||
        toggleBtn.getAttribute('aria-expanded') === 'true'
      );
    }

    function setMenuState(open) {
      nav.classList.toggle('globalnav-opened', open);
      nav.classList.toggle('is-open', open);
      document.documentElement.classList.toggle('globalnav-noscroll', open);
      document.body.style.overflow = open ? 'hidden' : '';
      toggleBtn.setAttribute('aria-expanded', open ? 'true' : 'false');

      if (curtain) {
        curtain.classList.toggle('is-open', open);
        curtain.classList.toggle('globalnav-curtain-visible', open);
      }
    }

    toggleBtn.addEventListener('click', function (e) {
      e.preventDefault();
      setMenuState(!isOpen());
    });

    if (curtain) {
      curtain.addEventListener('click', function () {
        if (isOpen()) {
          setMenuState(false);
        }
      });
    }

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && isOpen()) {
        setMenuState(false);
        toggleBtn.focus();
      }
    });

    var mq = window.matchMedia('(min-width: 834px)');
    var handleViewportChange = function (e) {
      if (e.matches && isOpen()) {
        setMenuState(false);
      }
    };
    if (mq.addEventListener) {
      mq.addEventListener('change', handleViewportChange);
    } else if (mq.addListener) {
      mq.addListener(handleViewportChange);
    }
  }

  /* ------------------------------------------------------------------------
     2. Mega Menu 3-Column Desktop Dropdowns
     ------------------------------------------------------------------------ */
  function initMegaMenu() {
    var nav = document.getElementById('globalnav');
    if (!nav) return;

    var curtain =
      document.querySelector('.globalnav-curtain') ||
      nav.querySelector('.globalnav-curtain');

    var menuItems = nav.querySelectorAll('.globalnav-item-menu');
    if (!menuItems.length) return;

    var activeItem = null;
    var closeTimer = null;

    function isDesktop() {
      return window.innerWidth >= 834;
    }

    function openFlyout(item) {
      if (!isDesktop()) return;
      if (closeTimer) {
        clearTimeout(closeTimer);
        closeTimer = null;
      }

      if (activeItem && activeItem !== item) {
        closeFlyout(activeItem, true);
      }

      activeItem = item;
      item.classList.add('globalnav-item-flyout-open');
      item.classList.add('is-open');
      item.setAttribute('data-flyout-active', 'true');

      var flyout = item.querySelector('.globalnav-submenu');
      if (flyout) {
        flyout.classList.add('is-open');
      }

      if (curtain) {
        curtain.classList.add('is-open');
        curtain.classList.add('globalnav-curtain-visible');
      }
    }

    function closeFlyout(item, immediate) {
      if (!item) return;

      var doClose = function () {
        item.classList.remove('globalnav-item-flyout-open');
        item.classList.remove('is-open');
        item.removeAttribute('data-flyout-active');

        var flyout = item.querySelector('.globalnav-submenu');
        if (flyout) {
          flyout.classList.remove('is-open');
        }

        if (activeItem === item) {
          activeItem = null;
          if (curtain && !nav.classList.contains('is-open')) {
            curtain.classList.remove('is-open');
            curtain.classList.remove('globalnav-curtain-visible');
          }
        }
      };

      if (immediate) {
        doClose();
      } else {
        closeTimer = setTimeout(doClose, 180);
      }
    }

    menuItems.forEach(function (item) {
      var flyout = item.querySelector('.globalnav-submenu');
      if (!flyout) return;

      item.addEventListener('mouseenter', function () {
        openFlyout(item);
      });

      item.addEventListener('mouseleave', function () {
        closeFlyout(item, false);
      });

      item.addEventListener('focusin', function () {
        openFlyout(item);
      });

      item.addEventListener('focusout', function (e) {
        if (!item.contains(e.relatedTarget)) {
          closeFlyout(item, false);
        }
      });
    });

    if (curtain) {
      curtain.addEventListener('mouseenter', function () {
        if (activeItem) {
          closeFlyout(activeItem, true);
        }
      });
    }

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && activeItem) {
        var link = activeItem.querySelector('.globalnav-link');
        closeFlyout(activeItem, true);
        if (link) link.focus();
      }
    });
  }

  /* ------------------------------------------------------------------------
     2b. Search & Bag Click-Activated Flyouts (DESIGN_SPEC 6.1, 6.2, 7.1)
     ------------------------------------------------------------------------ */
  function initActionFlyouts() {
    var nav = document.getElementById('globalnav');
    if (!nav) return;

    var curtain =
      document.querySelector('.globalnav-curtain') ||
      nav.querySelector('.globalnav-curtain');

    var searchTrigger = document.getElementById('globalnav-menubutton-link-search');
    var bagTrigger = document.getElementById('globalnav-menubutton-link-bag');

    var searchItem = nav.querySelector('.globalnav-item-search');
    var bagItem = nav.querySelector('.globalnav-item-bag');

    var searchInput = document.getElementById('globalnav-searchfield-input');
    var searchReset = document.getElementById('globalnav-searchfield-reset');

    var currentAction = null;

    function closeAllActionFlyouts(returnFocus) {
      if (!currentAction) return;

      var prev = currentAction;
      currentAction = null;

      if (searchInput && (document.activeElement === searchInput || (searchItem && searchItem.contains(document.activeElement)))) {
        searchInput.blur();
      }

      if (searchItem) {
        searchItem.classList.remove('globalnav-item-flyout-open', 'is-open');
        searchItem.removeAttribute('data-flyout-active');
      }
      if (searchTrigger) {
        searchTrigger.setAttribute('aria-expanded', 'false');
      }

      if (bagItem) {
        bagItem.classList.remove('globalnav-item-flyout-open', 'is-open');
        bagItem.removeAttribute('data-flyout-active');
      }
      if (bagTrigger) {
        bagTrigger.setAttribute('aria-expanded', 'false');
      }

      nav.classList.remove('globalnav-with-flyout-open');
      nav.classList.add('globalnav-with-flyout-closing');
      setTimeout(function () {
        nav.classList.remove('globalnav-with-flyout-closing', 'globalnav-animating');
      }, 320);

      if (curtain && !nav.classList.contains('is-open')) {
        curtain.classList.remove('is-open', 'globalnav-curtain-visible');
      }

      if (returnFocus) {
        if (prev === 'search' && searchTrigger) searchTrigger.focus();
        else if (prev === 'bag' && bagTrigger) bagTrigger.focus();
      }
    }

    function openActionFlyout(type) {
      if (currentAction === type) {
        closeAllActionFlyouts(true);
        return;
      }

      closeAllActionFlyouts(false);
      var openMega = nav.querySelector('.globalnav-item-menu.globalnav-item-flyout-open, .globalnav-item-menu.is-open');
      if (openMega) {
        openMega.classList.remove('globalnav-item-flyout-open', 'is-open');
        openMega.removeAttribute('data-flyout-active');
      }

      currentAction = type;
      nav.classList.add('globalnav-with-flyout-open', 'globalnav-animating');

      if (curtain) {
        curtain.classList.add('is-open', 'globalnav-curtain-visible');
      }

      if (type === 'search' && searchItem && searchTrigger) {
        searchItem.classList.add('globalnav-item-flyout-open', 'is-open');
        searchItem.setAttribute('data-flyout-active', 'true');
        searchTrigger.setAttribute('aria-expanded', 'true');

        if (searchInput) {
          setTimeout(function () {
            searchInput.focus();
          }, 60);
        }
      } else if (type === 'bag' && bagItem && bagTrigger) {
        bagItem.classList.add('globalnav-item-flyout-open', 'is-open');
        bagItem.setAttribute('data-flyout-active', 'true');
        bagTrigger.setAttribute('aria-expanded', 'true');
      }
    }

    if (searchTrigger) {
      searchTrigger.addEventListener('click', function (e) {
        e.preventDefault();
        openActionFlyout('search');
      });
    }

    if (bagTrigger) {
      bagTrigger.addEventListener('click', function (e) {
        e.preventDefault();
        openActionFlyout('bag');
      });
    }

    if (searchInput && searchReset) {
      searchInput.addEventListener('input', function () {
        searchReset.style.display = searchInput.value.length > 0 ? 'flex' : 'none';
      });

      searchReset.addEventListener('click', function (e) {
        e.preventDefault();
        searchInput.value = '';
        searchReset.style.display = 'none';
        searchInput.focus();
      });
    }

    if (curtain) {
      curtain.addEventListener('click', function () {
        closeAllActionFlyouts(false);
      });
    }

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && currentAction) {
        closeAllActionFlyouts(true);
      }
    });

    var megaItems = nav.querySelectorAll('.globalnav-item-menu');
    megaItems.forEach(function (mItem) {
      mItem.addEventListener('mouseenter', function () {
        if (currentAction) {
          closeAllActionFlyouts(false);
        }
      });
    });

    var mq = window.matchMedia('(max-width: 833px)');
    var handleViewport = function (e) {
      if (e.matches && currentAction) {
        closeAllActionFlyouts(false);
      }
    };
    if (mq.addEventListener) mq.addEventListener('change', handleViewport);
    else if (mq.addListener) mq.addListener(handleViewport);
  }

  /* ------------------------------------------------------------------------
     3. Holiday 2026 Hero Variant Switcher (pink, blue, green, yellow)
        Exact URLs and background colors from DESIGN_SPEC.md 2.3 & 4.1
     ------------------------------------------------------------------------ */
  var HOLIDAY_VARIANTS = {
    pink: {
      color: '#5A122C',
      video:
        'https://www.apple.com/105/media/us/homepage/2026/5c860636-9312-49bb-9597-d145f535822c/anim/hero-pink/large_2x.mp4',
      large:
        'https://www.apple.com/v/homepage/images/holiday-2026/a/hero_holiday_2026_pink__bc2rstir59lu_large.jpg',
      large2x:
        'https://www.apple.com/v/homepage/images/holiday-2026/a/hero_holiday_2026_pink__bc2rstir59lu_large_2x.jpg',
      startframeLarge:
        'https://www.apple.com/v/homepage/images/holiday-2026/a/hero_holiday_2026_pink_startframe__ca2xflouavci_large_2x.jpg',
      startframeLarge2x:
        'https://www.apple.com/v/homepage/images/holiday-2026/a/hero_holiday_2026_pink_startframe__ca2xflouavci_large_2x.jpg'
    },
    blue: {
      color: '#00224D',
      video:
        'https://www.apple.com/105/media/us/homepage/2026/5c860636-9312-49bb-9597-d145f535822c/anim/hero-blue/large_2x.mp4',
      large:
        'https://www.apple.com/v/homepage/images/holiday-2026/a/hero_holiday_2026_blue__fx7czvikivue_large.jpg',
      large2x:
        'https://www.apple.com/v/homepage/images/holiday-2026/a/hero_holiday_2026_blue__fx7czvikivue_large_2x.jpg',
      startframeLarge:
        'https://www.apple.com/v/homepage/images/holiday-2026/a/hero_holiday_2026_blue_startframe__dd0romk4mh8i_large.jpg',
      startframeLarge2x:
        'https://www.apple.com/v/homepage/images/holiday-2026/a/hero_holiday_2026_blue_startframe__dd0romk4mh8i_large_2x.jpg'
    },
    green: {
      color: '#1A4C44',
      video:
        'https://www.apple.com/105/media/us/homepage/2026/5c860636-9312-49bb-9597-d145f535822c/anim/hero-green/large_2x.mp4',
      large:
        'https://www.apple.com/v/homepage/images/holiday-2026/a/hero_holiday_2026_green__cxyzwl8xlggi_large_2x.jpg',
      large2x:
        'https://www.apple.com/v/homepage/images/holiday-2026/a/hero_holiday_2026_green__cxyzwl8xlggi_large_2x.jpg',
      startframeLarge:
        'https://www.apple.com/v/homepage/images/holiday-2026/a/hero_holiday_2026_green_startframe__b8v6z8n8eouu_large_2x.jpg',
      startframeLarge2x:
        'https://www.apple.com/v/homepage/images/holiday-2026/a/hero_holiday_2026_green_startframe__b8v6z8n8eouu_large_2x.jpg'
    },
    yellow: {
      color: '#822704',
      video:
        'https://www.apple.com/105/media/us/homepage/2026/5c860636-9312-49bb-9597-d145f535822c/anim/hero-yellow/large_2x.mp4',
      large:
        'https://www.apple.com/v/homepage/images/holiday-2026/a/hero_holiday_2026_yellow__e64inaqmrbue_large.jpg',
      large2x:
        'https://www.apple.com/v/homepage/images/holiday-2026/a/hero_holiday_2026_yellow__e64inaqmrbue_large_2x.jpg',
      startframeLarge:
        'https://www.apple.com/v/homepage/images/holiday-2026/a/hero_holiday_2026_yellow_startframe__cr7ai51iloeq_large.jpg',
      startframeLarge2x:
        'https://www.apple.com/v/homepage/images/holiday-2026/a/hero_holiday_2026_yellow_startframe__cr7ai51iloeq_large_2x.jpg'
    }
  };

  function initHolidaySwitcher() {
    var holidayTile = document.querySelector('[data-tile-id="holiday-2026"]');
    if (!holidayTile) return;

    var pills = holidayTile.querySelectorAll(
      '[data-variant], [data-holiday-variant], [data-color], .holiday-color-pill, .holiday-swatch, .variant-pill'
    );
    if (!pills.length) return;

    function getVariantKey(el) {
      return (
        el.getAttribute('data-variant') ||
        el.getAttribute('data-holiday-variant') ||
        el.getAttribute('data-color') ||
        ''
      ).toLowerCase();
    }

    function applyVariant(variantKey) {
      var assets = HOLIDAY_VARIANTS[variantKey];
      if (!assets) return;

      holidayTile.setAttribute('data-holiday-active', variantKey);
      holidayTile.setAttribute('data-holiday-variant', variantKey);
      holidayTile.style.setProperty('--holiday-background', assets.color);
      holidayTile.style.backgroundColor = assets.color;

      var heroSource = holidayTile.querySelector('#holiday-2026-source');
      var heroImg = holidayTile.querySelector('#holiday-2026-img');
      var holidayVideo = holidayTile.querySelector('#holiday-2026-video');
      var holidayVideoSource = holidayTile.querySelector('#holiday-2026-video-source');

      if (holidayVideo && assets.video) {
        holidayVideo.poster = assets.startframeLarge2x;
        if (holidayVideoSource) {
          holidayVideoSource.src = assets.video;
        }
        holidayVideo.src = assets.video;
        holidayVideo.currentTime = 0;
        var playPromise = holidayVideo.play();
        if (playPromise !== undefined) {
          playPromise.catch(function () {});
        }
      }

      if (heroSource) {
        heroSource.srcset = assets.large + ' 1x, ' + assets.large2x + ' 2x';
      }
      if (heroImg) {
        heroImg.src = assets.large;
        heroImg.srcset = assets.large + ' 1x, ' + assets.large2x + ' 2x';
      }

      var pictures = holidayTile.querySelectorAll('picture');
      pictures.forEach(function (pic) {
        var isStartframe = pic.classList.contains('startframe') || pic.closest('.startframe');
        var url1x = isStartframe ? assets.startframeLarge : assets.large;
        var url2x = isStartframe ? assets.startframeLarge2x : assets.large2x;

        var sources = pic.querySelectorAll('source');
        sources.forEach(function (source) {
          source.srcset = url1x + ' 1x, ' + url2x + ' 2x';
        });

        var img = pic.querySelector('img');
        if (img) {
          img.src = url1x;
          img.srcset = url1x + ' 1x, ' + url2x + ' 2x';
        }
      });

      pills.forEach(function (pill) {
        var isMatch = getVariantKey(pill) === variantKey;
        pill.classList.toggle('is-active', isMatch);
        pill.classList.toggle('active', isMatch);
        pill.setAttribute('aria-pressed', isMatch ? 'true' : 'false');
      });
    }

    pills.forEach(function (pill) {
      pill.addEventListener('click', function () {
        var variantKey = getVariantKey(pill);
        if (HOLIDAY_VARIANTS[variantKey]) {
          applyVariant(variantKey);
        }
      });
    });
  }

  /* ------------------------------------------------------------------------
     4. Apple TV+ Streaming Carousel (#tv-media-gallery)
     - 9 slides, indexed 0..8
     - Transform translateX relative to current slide
     - Account for tile width + 13px gap (exposed side slides)
     - 4-second auto-advance
     - Play/Pause toggle
     - Dot clicks and touch drag/swipe
     ------------------------------------------------------------------------ */
  function initTvGallery() {
    var gallery = document.getElementById('tv-media-gallery');
    if (!gallery) return;

    var items = gallery.querySelectorAll('.media-gallery-item');
    if (!items.length) return;

    var dotItems = gallery.querySelectorAll('.dotnav-item');
    var playPauseBtn = gallery.querySelector('.media-gallery-dotnav-iconcontrol');
    var iconPause = playPauseBtn ? playPauseBtn.querySelector('.icon-pause') : null;
    var iconPlay = playPauseBtn ? playPauseBtn.querySelector('.icon-play') : null;

    var currentIndex = 0;
    var totalSlides = items.length;
    var timer = null;
    var isPlaying = true;
    var slideDuration = 4000;

    function getTileWidthAndGap() {
      var computed = window.getComputedStyle(gallery);
      var width = parseFloat(computed.getPropertyValue('--media-gallery-tile-width'));
      var gap = parseFloat(computed.getPropertyValue('--media-gallery-tile-gap')) || 13;

      if (isNaN(width) || width <= 0) {
        var w = window.innerWidth;
        if (w >= 1441) width = 1250;
        else if (w >= 1069) width = 930;
        else if (w >= 735) width = 688;
        else width = 275;
      }
      return { width: width, gap: gap, step: width + gap };
    }

    function updateSlidePositions() {
      var geom = getTileWidthAndGap();

      items.forEach(function (item, idx) {
        var diff = idx - currentIndex;
        // Circular distance or linear? Carousel displays in track with centered active slide
        var offset = diff * geom.step;
        item.style.transform = 'translate3d(' + offset + 'px, 0px, 0px)';

        var isCurrent = idx === currentIndex;
        item.classList.toggle('current-item', isCurrent);
        item.setAttribute('aria-hidden', isCurrent ? 'false' : 'true');

        var link = item.querySelector('.media-gallery-wrapper-link');
        if (link) {
          link.tabIndex = isCurrent ? 0 : -1;
        }
      });

      dotItems.forEach(function (dot, idx) {
        var isCurrent = idx === currentIndex;
        dot.classList.toggle('current-item', isCurrent);
        var btn = dot.querySelector('.dotnav-button');
        if (btn) {
          btn.setAttribute('aria-current', isCurrent ? 'true' : 'false');
        }
      });
    }

    function goToSlide(index) {
      if (index < 0) {
        currentIndex = totalSlides - 1;
      } else if (index >= totalSlides) {
        currentIndex = 0;
      } else {
        currentIndex = index;
      }
      updateSlidePositions();
    }

    function nextSlide() {
      goToSlide(currentIndex + 1);
    }

    function prevSlide() {
      goToSlide(currentIndex - 1);
    }

    function startAutoPlay() {
      stopAutoPlay();
      if (!isPlaying) return;
      timer = setInterval(function () {
        nextSlide();
      }, slideDuration);
    }

    function stopAutoPlay() {
      if (timer) {
        clearInterval(timer);
        timer = null;
      }
    }

    function setPlayingState(playing) {
      isPlaying = playing;
      if (playPauseBtn) {
        playPauseBtn.setAttribute(
          'aria-label',
          isPlaying ? 'Pause slideshow' : 'Play slideshow'
        );
      }
      if (iconPause) iconPause.style.display = isPlaying ? '' : 'none';
      if (iconPlay) iconPlay.style.display = isPlaying ? 'none' : '';

      if (isPlaying) {
        startAutoPlay();
      } else {
        stopAutoPlay();
      }
    }

    if (playPauseBtn) {
      playPauseBtn.addEventListener('click', function (e) {
        e.preventDefault();
        setPlayingState(!isPlaying);
      });
    }

    dotItems.forEach(function (dot, idx) {
      dot.addEventListener('click', function (e) {
        e.preventDefault();
        goToSlide(idx);
        if (isPlaying) {
          startAutoPlay();
        }
      });
    });

    items.forEach(function (item, idx) {
      item.addEventListener('click', function (e) {
        if (idx !== currentIndex) {
          e.preventDefault();
          goToSlide(idx);
          if (isPlaying) {
            startAutoPlay();
          }
        }
      });
    });

    // Pause on hover
    gallery.addEventListener('mouseenter', function () {
      stopAutoPlay();
    });

    gallery.addEventListener('mouseleave', function () {
      if (isPlaying) {
        startAutoPlay();
      }
    });

    // Touch swipe support
    var startX = 0;
    var isDragging = false;

    gallery.addEventListener(
      'touchstart',
      function (e) {
        if (e.touches.length === 1) {
          startX = e.touches[0].clientX;
          isDragging = true;
          stopAutoPlay();
        }
      },
      { passive: true }
    );

    gallery.addEventListener(
      'touchend',
      function (e) {
        if (!isDragging) return;
        isDragging = false;
        var endX = e.changedTouches[0].clientX;
        var diffX = endX - startX;
        if (Math.abs(diffX) > 40) {
          if (diffX < 0) {
            nextSlide();
          } else {
            prevSlide();
          }
        }
        if (isPlaying) {
          startAutoPlay();
        }
      },
      { passive: true }
    );

    // Resize handler
    window.addEventListener('resize', function () {
      updateSlidePositions();
    });

    // Initial setup
    updateSlidePositions();
    startAutoPlay();
  }

  /* ------------------------------------------------------------------------
     5. Scroll Reveal Animations (Apple Cubic-Bezier Easing)
     ------------------------------------------------------------------------ */
  function initScrollReveal() {
    var targets = document.querySelectorAll(
      '.hero-tile, .section-promo .tile-wrapper, .endless-entertainment .media-gallery, .endless-entertainment .media-gallery-headline'
    );
    if (!targets.length) return;

    targets.forEach(function (el) {
      el.classList.add('scroll-reveal');
    });

    if ('IntersectionObserver' in window) {
      var observer = new IntersectionObserver(
        function (entries) {
          entries.forEach(function (entry) {
            if (entry.isIntersecting) {
              entry.target.classList.add('is-revealed');
              observer.unobserve(entry.target);
            }
          });
        },
        { rootMargin: '0px 0px -40px 0px', threshold: 0.1 }
      );

      targets.forEach(function (el) {
        observer.observe(el);
      });
    } else {
      targets.forEach(function (el) {
        el.classList.add('is-revealed');
      });
    }
  }

  /* ------------------------------------------------------------------------
     6. Video Auto-Play Handling (Hero 1, Hero 2, Bento 5)
     ------------------------------------------------------------------------ */
  function initVideos() {
    var videos = document.querySelectorAll('video[autoplay]');
    videos.forEach(function (video) {
      video.muted = true;
      video.defaultMuted = true;
      video.playsInline = true;
      video.setAttribute('playsinline', '');
      video.setAttribute('muted', '');
      var playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise.catch(function () {});
      }
    });
  }

  /* ------------------------------------------------------------------------
     7. iPhone Duo Animated Subhead ("Hello, hello.") Loop & Sync
     ------------------------------------------------------------------------ */
  function initIphoneDuoAnimation() {
    var duoTile = document.querySelector('[data-tile-id="iphone-duo"]');
    if (!duoTile) return;

    var video = duoTile.querySelector('video');
    function triggerAnimation() {
      duoTile.classList.remove('animate-subhead');
      void duoTile.offsetWidth;
      duoTile.classList.add('animate-subhead');
    }

    if (video) {
      video.addEventListener('seeked', function () {
        if (video.currentTime < 0.3) {
          triggerAnimation();
        }
      });
      video.addEventListener('play', function () {
        triggerAnimation();
      });
    }

    triggerAnimation();
  }

  /* ------------------------------------------------------------------------
     Initialization
     ------------------------------------------------------------------------ */
  function init() {
    initNavbar();
    initMegaMenu();
    initActionFlyouts();
    initHolidaySwitcher();
    initTvGallery();
    initScrollReveal();
    initVideos();
    initIphoneDuoAnimation();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
