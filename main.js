class BPlayer {
  static mixin_key = null;
  
  #url = '';

  // 进度条被按下
  progress_is_mousedown = false;
  // 鼠标指向进度条 新时间
  #newTime;
  // 是否正在缓冲
  waiting = false;
  // 鼠标不动计时器
  leave_timer = null;
  // 当前播放速率
  currentRate = 1;

  /**
   * 视频播放器
   * @constructor
   * @author HBcao233
   */
  constructor(selector) {
    this.config = JSON.parse(window.localStorage.getItem('bpx_player_profile') || '{"media":{"volume":"1","nonzeroVol":"1","autoplay":false}}');
    this.videoElement = document.querySelector(selector);
    this.createElements();
    this.video_info = {};
    
    this.progressElement = this.playerElement.querySelector('.bpx-player-progress');
    this.canvas = tag('canvas');
    this.videoElementPreview = tag('video', {
      attrs: {
        preload: "metadata",
        crossOrigin: 'anonymous',
      }
    });
    
    // 手机版点击一次显示
    this.showed = false;
    this.init();
  }

  createElements() {
    // 样式
    if (!document.querySelector('#bplayer-style')) {
      const style = document.createElement('style');
      style.id = 'bplayer-style';
      style.innerHTML = styles;
      document.body.appendChild(style);
    }
    
    const tooltip_incenter = tag('div', {
      class: 'bpx-player-tooltip-incenter',
      children: tag('div', {
        class: 'incenter bpx-player-tooltip-item',
        innerHTML: '<span class="text"></span>',
      })
    });
    const playrate_hint = tag('div', {
      class: 'bpx-player-playrate-hint',
      style: 'display: none',
      children: [
        tag('span', {
          class: 'icon', 
          innerHTML: svgs.playrate_hint,
        }),
        tag('span', { class: 'text', innerHTML: '倍速播放中' })
      ]
    });
    // 控制按钮和进度条
    const control = tag('div', {
      class: 'bpx-player-control', children: [
        tag('div', { class: 'bpx-player-control-mask' }),
        tag('div', {
          class: 'bpx-player-control-top',
          innerHTML: `<div class="bpx-player-progress">
  <div class="schedule"><div class="buffer"></div><div class="current"></div></div>
  <div class="thumb"><div class="thumb-icon">${svgs.thumb}</div></div>
  <div class="move-indicator" style="left: 0"><div class="down"></div><div class="up"></div></div>
  <div class="popup" style="left: 0"><div class="preview"><div class="preview-image"></div><div class="preview-time"></div></div></div>
          </div>`,
        }),
        tag('div', {
          class: 'bpx-player-control-bottom',
          innerHTML: `
<div class="bpx-player-control-bottom-left">
  <div class="control-btn previous" aria-label="上一个" style="display: none; transform: rotate(180deg)"><div class="icon">${svgs.next}</div></div>
  <div class="control-btn play" aria-label="播放/暂停"><div class="icon">${svgs.pause}${svgs.play}</div></div>
  <div class="control-btn next" aria-label="下一个" style="display: none"><div class="icon">${svgs.next}</div></div>
  <div class="control-btn time" aria-label="时间显示"><input class="seek" name="seek" style="display: none"/><span class="current">00:00</span><span class="divide">/</span><span class="duration">00:00</span></div>
</div>
<div class="bpx-player-control-bottom-right">
  <div class="control-btn playbackrate" aria-label="倍速"><div class="text">倍速</div><ul class="playbackrate-menu">${[2, 1.5, 1.25, 1, 0.75, 0.5].map(i => `<li class="item${i === 1 ? ' active' : ''}" data-value="${i}">${i}x</li>`).join('')}</ul></div>
  <div class="control-btn volume" aria-label="音量"><div class="icon volume-icon">${svgs.volume}</div><div class="icon muted-icon" style="display: none">${svgs.volume_muted}</div><div class="volume-box"><div class="volume-number">100</div><div class="volume-slider"><div class="track"><div class="bar-wrap"><div class="bar"></div></div><div class="thumb"><div class="thumb-dot"></div></div></div></div></div></div>
  <div class="control-btn settings" aria-label="设置"><div class="icon">${svgs.settings}</div></div>
  <div class="control-btn pip" aria-label="画中画"><div class="icon">${svgs.pip}</div></div>
  <div class="control-btn fullscreen" aria-label="全屏"><div class="icon">${svgs.fullscreen}</div></div>
</div>`,
        }),
      ]
    });
    
    // 状态显示区域
    const state_wrap = tag('div', {
      class: 'bpx-player-state-wrap', children: [
        tag('div', { class: 'bpx-player-state-play' }),
        tag('div', {
          class: 'bpx-player-state-buff-icon', 
          innerHTML: svgs.loading,
        }),
        tag('div', {
          class: 'bpx-player-state-buff-text', children: [
            tag('span', { class: 'title', innerHTML: '正在缓冲...' }),
            tag('span', { class: 'speed' }),
          ]
        })
      ]
    });
    // 加载中显示区域
    const loading_panel = tag('div', {
      class: 'bpx-player-loading-panel bpx-state-loading', children: tag('div', {
        class: 'bpx-player-loading-panel-blur',
        children: tag('div', { class: 'bpx-player-loading-panel-blur-detail' }),
      })
    });
    
    // 视频区域
    const video_area = tag('div', {
      class: 'bpx-player-video-area', children: [
        tag('div', {
          class: 'bpx-player-video-wrap', 
        }),
        tag('div', {
          class: 'bpx-player-row-dm-wrap',
        }),
        state_wrap,
        loading_panel,
        control,
        playrate_hint,
        tooltip_incenter,
      ]
    });
    const tooltip_area = tag('div', {
      class: 'bpx-player-tooltip-area', children: [
        tag('div', {
          class: 'previous bpx-player-tooltip-item',
          style: 'left: -2px; top: -85px;',
          children: tag('span', { class: 'text', innerHTML: '上一个 ([)' })
        }),
        tag('div', {
          class: 'next bpx-player-tooltip-item',
          style: 'left: 68px; top: -85px;',
          children: tag('span', { class: 'text', innerHTML: '下一个 (])' })
        }),
        tag('div', {
          class: 'fullscreen bpx-player-tooltip-item',
          style: 'right: -5px; top: -85px;',
          children: tag('span', { class: 'text', innerHTML: '进入全屏 (f)' })
        }),
      ]
    });
    this.playerElement = tag('div', {
      class: 'bpx-player',
      children: [
        video_area,
        tag('div', { class: 'bpx-player-sending-area' }),
        tooltip_area,
      ]
    });
    this.videoElement.before(this.playerElement);
    this.playerElement.querySelector('.bpx-player-video-wrap').appendChild(this.videoElement);
  }
  
  /**
   * 退出全屏
   */
  closeFullscreen() {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.webkitExitFullscreen) { /* Safari */
      document.webkitExitFullscreen();
    } else if (document.msExitFullscreen) { /* IE11 */
      document.msExitFullscreen();
    }
  }
  /**
   * 进入全屏
   */
  openFullscreen() {
    const el = this.playerElement;
    if (!el) return;
    if (el.requestFullscreen) {
      el.requestFullscreen();
    } else if (el.webkitRequestFullscreen) { /* Safari */
      el.webkitRequestFullscreen();
    } else if (el.msRequestFullscreen) { /* IE11 */
      el.msRequestFullscreen();
    }
  }
  /**
   * 切换全屏
   */
  toggleFullscreen() {
    document.fullscreenElement ? this.closeFullscreen() : this.openFullscreen();
  }

  /**
   * 鼠标进入/离开
   */
  playerLeave() {
    this.playerElement.style.cursor = 'none';
    this.playerElement.classList.remove('hover');
  }
  playerEnter() {
    this.playerElement.style.cursor = 'pointer';
    this.playerElement.classList.add('hover');
    clearTimeout(this.leave_timer);
    this.leave_timer = setTimeout(() => {
      this.playerLeave();
      this.showed = false;
    }, 3000);
  }

  /**
   * 进度条渲染
   */
  progress_render() {
    const video_buffer = this.videoElement.buffered;
    const video_buffered = video_buffer.length > 0 ? video_buffer.end(video_buffer.length - 1) : 0;
    const duration = this.duration;
    const buffered = video_buffered / duration;

    if (!this.paused) this.playerElement.classList.remove('bpx-state-paused');
    const current = this.currentTime / duration;
    const total_px = this.progressElement.querySelector('.schedule').clientWidth;
    this.progressElement.querySelector('.buffer').style.transform = 'scaleX(' + buffered + ')';
    this.progressElement.querySelector('.current').style.transform = 'scaleX(' + current + ')';
    this.progressElement.querySelector('.thumb').style.transform = 'translateX(' + current * total_px + 'px)';
    this.playerElement.querySelector('.control-btn.time .current').innerHTML = formatTime(this.currentTime);
  }

  /**
   * 视频点击
   */
  videoClick() {
    if (isMobile() && !this.showed) {
      this.showed = true;
      this.playerEnter();
      if (this.paused) this.play();
      return;
    }
    this.playOrPause();
  }
  /**
   * 视频播放/暂停
   */
  playOrPause() {
    if (this.paused) {
      this.play();
    } else {
      this.pause();
    }
  }
  
  /**
   * 倍速按钮初始化
   */
  initPlaybackrateButton(t) {
    let idx;
    t.addEventListener('mouseenter', () => {
      clearTimeout(idx);
      t.classList.add('hover');
      t.querySelector('ul').classList.remove('show-below');
      const rect = t.querySelector('ul').getBoundingClientRect();
      if (rect.top < 0) {
        t.querySelector('ul').classList.add('show-below');
      } 
    })
    t.addEventListener('mouseleave', () => {
      idx = setTimeout(() => { t.classList.remove('hover') }, 200);
    })
    t.addEventListener('click', (e) => {
      if (!e.target.closest('.playbackrate-menu .item')) return;
      const x = e.target.getAttribute('data-value');
      if (x < 0) return;
      this.playbackRate = parseFloat(x);
      this.currentRate = parseFloat(x);
      for (const i of t.querySelectorAll('.playbackrate-menu .item')) {
        i.classList.remove('active');
      }
      e.target.classList.add('active');
      t.querySelector('.text').innerText = (x === '1' ? '倍速' : x + 'x');
    });
  }
  
  /**
   * 初始化音量按钮
   */
  initVolumeButton(t) {
    let idx;
    let slider_mousedown = false;
    const mouseleave = () => { if (!slider_mousedown) t.classList.remove('hover') };
    const slider = t.querySelector('.volume-slider');
    const sliderUpdateVolume = (x) => {
      if (x > 0 && x <= 1) {
        t.querySelector('.volume-icon').style.display = 'block';
        t.querySelector('.muted-icon').style.display = 'none';
        t.querySelector('.volume-slider .bar-wrap .bar').style.transform = 'translateY(' + (1 - x) * slider.clientHeight + 'px)';
        t.querySelector('.volume-slider .thumb').style.transform = 'translateY(' + (1 - x) * slider.clientHeight + 'px)';
        t.querySelector('.volume-number').innerHTML = Math.round(x * 100);
      } else if (x <= 0) {
        t.querySelector('.volume-icon').style.display = 'none';
        t.querySelector('.muted-icon').style.display = 'block';
        t.querySelector('.volume-slider .bar-wrap .bar').style.transform = 'translateY(' + slider.clientHeight + 'px)';
        t.querySelector('.volume-slider .thumb').style.transform = 'translateY(' + slider.clientHeight + 'px)';
        t.querySelector('.volume-number').innerHTML = 0;
      }
    }
  
    t.addEventListener('mouseenter', () => {
      clearTimeout(idx);
      t.classList.add('hover');
      sliderUpdateVolume(this.config.media.volume);
    })
    t.addEventListener('mouseleave', () => {
      idx = setTimeout(mouseleave, 200);
    })
    t.addEventListener('click', () => {
      if (isMobile()) return;
      if (this.config.media.volume == 0) {
        t.querySelector('.volume-icon').style.display = 'block';
        t.querySelector('.muted-icon').style.display = 'none';
        this.config.media.volume = this.config.media.nonzeroVol;
      } else {
        t.querySelector('.volume-icon').style.display = 'none';
        t.querySelector('.muted-icon').style.display = 'block';
        this.config.media.volume = 0;
      }
      this.volume = this.config.media.volume;
      localStorage.setItem('bpx_player_profile', JSON.stringify(this.config));
    });
  
    t.querySelector('.volume-box').addEventListener('mouseenter', () => {
      clearTimeout(idx);
    });
    t.querySelector('.volume-box').addEventListener('mouseleave', () => {
      idx = setTimeout(mouseleave, 200);
    });
    t.querySelector('.volume-box').addEventListener('click', e => e.stopPropagation());
  
    /**
     * 音量滑条
     */
    let moved = false;
    let click_y = 0;
    const onMousedown = (e) => {
      slider_mousedown = true;
      t.classList.add('hover');
      clearTimeout(idx);
      moved = false;
      click_y = e.clientY;
      if (e.touches) click_y = e.touches[0].clientY;
    };
    const onMouseup = (e) => {
      slider_mousedown = false;
      t.classList.remove('hover');
      const y = click_y;
      if (!moved) {
        const rect = slider.getBoundingClientRect();
        const x = 1 - (y - rect.top) / slider.clientHeight;
        sliderUpdateVolume(x);
        if (x > 0 && x <= 1) {
          this.config.media.volume = x;
          this.config.media.nonzeroVol = x;
        } else if (x <= 0) {
          this.config.media.volume = 0;
        }
        this.volume = this.config.media.volume;
        window.localStorage.setItem('bpx_player_profile', JSON.stringify(this.config));
      }
    }
    const onMousemove = (e) => {
      moved = true;
      let y = e.clientY;
      if (e.touches) y = e.touches[0].clientY;
      if (slider_mousedown) clearTimeout(idx);

      if (slider_mousedown) {
        const rect = slider.getBoundingClientRect();
        const x = 1 - (y - rect.top) / slider.clientHeight;
        sliderUpdateVolume(x);
        if (x > 0 && x <= 1) {
          this.config.media.volume = x;
          this.config.media.nonzeroVol = x;
        } else if (x <= 0) {
          this.config.media.volume = 0;
        }
        this.volume = this.config.media.volume;
        window.localStorage.setItem('bpx_player_profile', JSON.stringify(this.config));
      }
    }
    t.querySelector('.volume-box .volume-slider').addEventListener('mousedown', onMousedown);
    document.addEventListener('mouseup', onMouseup);
    document.addEventListener('mousemove', onMousemove);
    if (isMobile()) {
      t.querySelector('.volume-box .volume-slider').addEventListener('touchstart', onMousedown);
      document.addEventListener('touchend', onMouseup);
      document.addEventListener('touchmove', onMousemove);
    }
  }

  /**
   * 初始化
   */
  init() {
    /**
     * player 节点监听
     */
    if (!isMobile()) {
      this.playerElement.addEventListener('mouseenter', () => this.playerEnter());
      this.playerElement.addEventListener('mousemove', () => this.playerEnter());
      this.playerElement.addEventListener('mouseleave', () => this.playerLeave());
    } 
    
    // 画中画
    this.playerElement.querySelector('.control-btn.pip').addEventListener('click', () => {
      this.videoElement.requestPictureInPicture()
    });
    // 全屏按钮
    if (isMobile()) {
      this.playerElement.querySelector('.control-btn.fullscreen').style.display = 'none';
    }
    this.playerElement.querySelector('.control-btn.fullscreen').addEventListener('click', this.toggleFullscreen.bind(this));
    // 倍速
    this.initPlaybackrateButton(this.playerElement.querySelector('.control-btn.playbackrate'));
    // 音量
    this.initVolumeButton(this.playerElement.querySelector('.control-btn.volume'));
    
    /**
     * 监听进入/退出全屏
     */
    document.addEventListener('fullscreenchange', () => {
      if (document.fullscreenElement) {
        this.playerElement.classList.add('bpx-state-fullscreen');
        this.videoElement.style.width = '100%';
        this.videoElement.style.height = '100%';
      } else {
        this.playerElement.classList.remove('bpx-state-fullscreen');
        this.videoElement.style.removeProperty('width');
        this.videoElement.style.removeProperty('height');
      }
    })
    /**
     * 监听键盘
     */
    if (!isMobile()) {
      document.addEventListener('keydown', async (e) => {
        if (e.target.closest('input')) return;
        switch (e.code) {
          case 'F11':
          case 'KeyF':
          case 'Space':
            e.preventDefault();
            break;
          // 快退
          case 'ArrowLeft':
            e.preventDefault();
            this.videoBackwardStart();
            break;
          // 快进
          case 'ArrowRight':
            e.preventDefault();
            this.videoForwardStart();
            break;
          case 'ArrowUp':
          case 'ArrowDown':
            e.preventDefault();
            break;
        }
      })
      document.addEventListener('keyup', async (e) => {
        if (e.target.closest('input')) return;
        switch (e.code) {
          // 上一条
          case 'BracketLeft':
          case 'ArrowUp':
            e.preventDefault();
            await previousVideo();
            break;
          // 下一条
          case 'BracketRight':
          case 'ArrowDown':
            e.preventDefault();
            await nextVideo();
            break;
          // 点赞
          case 'KeyQ':
            await likeClick();
            break;
          // 全屏
          case 'F11':
          case 'KeyF':
            e.preventDefault();
            this.toggleFullscreen();
            break;
          // 播放/暂停
          case 'Space':
            e.preventDefault();
            this.playOrPause();
            break;
          // 快退
          case 'ArrowLeft':
            e.preventDefault();
            this.videoBackwardEnd();
            break;
          // 快进
          case 'ArrowRight':
            e.preventDefault();
            this.videoForwardEnd();
            break;
        }
      })
    } else {
      let longPressTimer = null;
      const longPressDuration = 500;
      let state = 0;
      let lastTapTime = 0;
      let touchTimer = null;
      // 双击时间间隔阈值（毫秒）
      const DOUBLE_TAP_DELAY = 300;
      let lastTouchX = 0;
      
      this.videoElement.addEventListener('contextmenu', (e) => {
        e.preventDefault();
      });
      this.videoElement.addEventListener('touchstart', (e) => {
        lastTouchX = e.touches[0].clientX;
        longPressTimer = setTimeout(() => {
          const rect = this.videoElement.getBoundingClientRect();
          if ((lastTouchX - rect.left) > rect.width / 2) {
            state = 1;
            this.videoForwardStart();
          } else {
            state = 2;
            this.videoBackwardStart();
          }
        }, longPressDuration);
      });
      this.videoElement.addEventListener('touchend', (e) => {
        clearTimeout(longPressTimer);
        if (state == 1) this.videoForwardEnd();
        else if (state == 2) this.videoBackwardEnd();
        state = 0;
        
        // 双击事件监听
        const currentTime = Date.now();
        const tapInterval = currentTime - lastTapTime;
        clearTimeout(touchTimer);
        if (tapInterval < DOUBLE_TAP_DELAY && tapInterval > 0) {
          // 双击逻辑
          e.preventDefault();
          const rect = this.videoElement.getBoundingClientRect();
          if ((lastTouchX - rect.left) > rect.width / 2) {
            this.videoForwardEnd();
          } else {
            this.videoBackwardEnd();
          }
        } else {
          touchTimer = setTimeout(() => {
            // 单击
            this.videoClick();
          }, DOUBLE_TAP_DELAY);
        }
        lastTapTime = currentTime;
      });
      this.videoElement.addEventListener('touchmove', (e) => {
        clearTimeout(longPressTimer);
      });
    }

    /**
     * 视频节点监听
     */
    this.videoElement.addEventListener('canplay', (e) => {
      this.playerElement.querySelector('.control-btn.time .duration').innerHTML = formatTime(this.duration);
      this.playerElement.querySelector('.bpx-player-loading-panel').classList.remove('bpx-state-loading');
      this.playerElement.classList.add('bpx-state-paused');
      // this.play();
      const w = this.videoElement.videoWidth;
      const h = this.videoElement.videoHeight;
      if (w > h) {
        this.canvas.width = 320;
        this.canvas.height = Math.floor(h * 320 / w);
      } else {
        this.canvas.width = Math.floor(w * 320 / h);
        this.canvas.height = 320;
      }
    });
    /**
     * 视频播放但音频没有播放
     * （画中画时点播放按钮会出现这种情况）
     */
    this.videoElement.addEventListener('play', (e) => {
      if (!document.pictureInPictureElement) return;
      if (this.audioElement.paused) this.audioElement.play();
    });
    this.videoElement.addEventListener('pause', (e) => {
      if (!document.pictureInPictureElement) return;
      if (!this.audioElement.paused) this.audioElement.pause();
    });
    
    // 视频点击
    if (!isMobile()) this.videoElement.addEventListener('click', () => this.videoClick());
    // 播放暂停
    this.playerElement.querySelector('.control-btn.play').addEventListener('click', () => this.playOrPause());
    this.videoElement.addEventListener('timeupdate', () => {
      if (this.progress_is_mousedown) return;
      if (this.has_audio) return;
      this.progress_render();
    });

    this.videoElement.addEventListener('waiting', async () => {
      if (this.frameSyncing) return;
      if (!this.waiting) {
        this.waiting = true;
        this.playerElement.classList.add('bpx-state-buff');
      }
    })
    this.videoElement.addEventListener('playing', () => {
      if (this.frameSyncing) {
        this.frameSyncing = false;
      }
      if (this.waiting) {
        this.waiting = false;
      }
      this.playerElement.classList.remove('bpx-state-buff');
    });
    // 播放结束
    this.videoElement.addEventListener('ended', () => {
      this.playerElement.classList.add('bpx-state-paused');
    });

    /**
     * 进度条节点监听
     */
    let idx;
    const progress_func = (e) => {
      let clientX = e.clientX;
      if (e.touches) {
        if (e.touches.length == 0) return;
        clientX = e.touches[0].clientX;
      }
      let x = (clientX - this.progressElement.getBoundingClientRect().left + 2);
      if (x < 0) x = 0;
      if (x > this.progressElement.clientWidth) x = this.progressElement.clientWidth;
      this.progressElement.querySelector('.move-indicator').style.left = x + 'px';
      this.progressElement.querySelector('.popup').style.left = x + 'px';
      const current = x / this.progressElement.clientWidth;
      const duration = this.videoElement.duration;

      if (!duration) return;
      const flag = Math.floor((this.#newTime + 2) / 7) * 7 == Math.floor((current * duration + 2) / 7) * 7;
      if (this.progress_is_mousedown) {
        const total_px = this.progressElement.querySelector('.schedule').clientWidth;
        this.progressElement.querySelector('.current').style.transform = 'scaleX(' + current + ')';
        this.progressElement.querySelector('.thumb').style.transform = 'translateX(' + current * total_px + 'px)';
      }
      this.progressElement.querySelector('.preview-time').innerHTML = formatTime(current * duration);
      this.#newTime = current * duration;

      if (flag) return;
      clearTimeout(idx);
      idx = setTimeout(() => {
        this.videoElementPreview.currentTime = this.#newTime;
      }, 50);
    };
    /**
     * 生成预览图
     */
    this.videoElementPreview.addEventListener('timeupdate', () => {
      this.canvas.getContext('2d').drawImage(this.videoElementPreview, 0, 0, this.canvas.width, this.canvas.height);
      this.progressElement.querySelector('.preview-image').src = this.canvas.toDataURL("image/png");
    })
    
    /**
     * 进度条监听
     */
    this.progressElement.addEventListener('mouseenter', (e) => {
      this.progressElement.classList.add('active');
      progress_func(e);
    });
    document.addEventListener('mousemove', (e) => {
      if (this.progress_is_mousedown || e.target.closest('.bpx-player-progress')) {
        progress_func(e);
      }
    });
    this.progressElement.addEventListener('mouseleave', (e) => {
      if (!this.progress_is_mousedown) this.progressElement.classList.remove('active');
      progress_func(e);
    });
    this.progressElement.addEventListener('mousedown', (e) => {
      e.stopPropagation();
      if (e.buttons & 1 === 1) {
        this.progress_is_mousedown = true;
        this.progressElement.classList.add('active');
      }
    });
    document.addEventListener('mouseup', () => {
      if (this.progress_is_mousedown) {
        this.currentTime = this.#newTime;
      }
      if (!this.progress_is_mousedown) this.progressElement.classList.remove('active');
      this.progress_is_mousedown = false;
    });
    let touched = false;
    let moved = false;
    if (isMobile) {
      this.progressElement.addEventListener('touchstart', (e) => {
        touched = true;
        this.progressElement.classList.add('active');
        progress_func(e);
      });
      document.addEventListener('touchmove', (e) => {
        if (!touched) return;
        if (!e.touches || e.touches.length == 0) return;
        if (moved || e.target.closest('.bpx-player-progress')) {
          moved = true;
          progress_func(e);
        }
      });
      document.addEventListener('touchend', (e) => {
        if (touched && moved) {
          this.currentTime = this.#newTime;
        }
        touched = false;
        moved = false;
      });
    }
  }

  /**
   * @returns {String}
   */
  get src() {
    return this.videoElement.src;
  }
  /**
   * @param {String} u
   */
  set src(u) {
    this.videoElement.src = u;
    this.videoElementPreview.src = u;
  }
  
  get srcObject() {
    return this.videoElement.srcObject;
  }
  
  set srcObject(v) {
    this.videoElement.srcObject = v;
    this.videoElementPreview.srcObject = v;
  }

  /**
   * duration
   */
  get duration() {
    return this.videoElement.duration;
  }

  /**
   * 当前播放时间
   * @returns {Number}
   */
  get currentTime() {
    return this.videoElement.currentTime;
  }
  /**
   * 跳转播放 seeking
   * @param {Number} c
   */
  set currentTime(c) {
    this.videoElement.currentTime = c;
  }
  get seeking() {
    return this.videoElement.seeking;
  }

  /**
   * 播放速度
   * @returns {Number}
   */
  get playbackRate() {
    return this.videoElement.playbackRate;
  }
  /**
   * ratechange
   * @param {Number} r
   */
  set playbackRate(r) {
    this.videoElement.playbackRate = r;
  }

  /**
   * paused
   * @returns {Bool}
   */
  get paused() {
    return this.videoElement.paused;
  }

  /**
   * 音量
   * @returns {Number}
   */
  get volume() {
    return this.videoElement.volume;
  }
  /**
   * 设置音量
   * @param {Number} v
   */
  set volume(v) {
    this.videoElement.volume = v;
  }

  /**
   * 播放
   */
  play() {
    this.videoElement.play();
    this.playerElement.classList.remove('bpx-state-paused');
  }

  /**
   * 暂停
   */
  pause() {
    this.videoElement.pause();
    this.playerElement.classList.add('bpx-state-paused');
  }

  /**
   * 视频快进 / 3倍速播放
   */
  forward_idx = null;
  forwarding = false;
  videoForwardStart() {
    this.playerElement.classList.add('hover')
    if (!this.forwarding) this.forward_idx = setTimeout(() => {
      this.forwarding = true;
      this.playbackRate = this.currentRate * 3;
      this.playerElement.querySelector('.bpx-player-playrate-hint').style.removeProperty('display');
    }, 500);
  }
  videoForwardEnd() {
    clearTimeout(this.forward_idx);
    if (!this.forwarding) {
      this.currentTime = this.currentTime + 5 > this.duration ? this.duration : this.currentTime + 5;
    }
    this.forwarding = false;
    this.playerElement.querySelector('.bpx-player-playrate-hint').style.display = 'none';
    this.playbackRate = this.currentRate;
  }

  /**
   * 视频快退
   */
  backward_idx = null;
  backwarding = false;
  videoBackwardStart() {
    this.playerElement.classList.add('hover')
    if (!this.backwarding) this.backward_idx = setInterval(() => {
      this.backwarding = true
      if (this.backwarding) this.currentTime = this.currentTime - 1 > 0 ? this.currentTime - 1 : 0;
    }, 200);
  }
  videoBackwardEnd() {
    if (!this.backwarding) {
      this.currentTime = this.currentTime - 5 > 0 ? this.currentTime - 5 : 0;
    }
    clearInterval(this.backward_idx);
    this.backwarding = false
  }
}

if ("object" == typeof exports && "object"== typeof module) {
  module.exports = BPlayer;
} else {
  if ("function" == typeof define && define.amd) {
    define("BPlayer",[],BPlayer)
  } else {
    if ("object" == typeof exports) {
      exports.BPlayer = BPlayer;
    } else {
      window.BPlayer = BPlayer;
    }
  }
}
