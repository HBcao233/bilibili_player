(function(){
  'use strict';
  let styles = `
    @keyframes opacity-gradient
    {
      0%, 100% {opacity: 0}
      50%      {opacity: 1}
    }
    @keyframes loading {
      0%      { background-position: 0 0; }
      6.25%   { background-position: -320px 0; }
      12.5%   { background-position: -640px 0; }
      18.75%  { background-position: -960px 0; }
      25%     { background-position: -1280px 0; }
      31.25%  { background-position: -1600px 0; }
      37.5%   { background-position: -1920px 0; }
      43.75%  { background-position: -2240px 0; }
      50%     { background-position: -2560px 0; }
      56.25%  { background-position: -2880px 0; }
      62.5%   { background-position: -3200px 0; }
      68.75%  { background-position: -3520px 0; }
      75%     { background-position: -3840px 0; }
      81.25%  { background-position: -4160px 0; }
      87.5%   { background-position: -4480px 0; }
      93.75%  { background-position: 0 -184px; }
      100%    { background-position: -320px -184px; }
    }
    @keyframes circle-spread {
      0%         { clip-path: none }
      66.666666% { clip-path: none }
      66.666667% { clip-path: polygon(50% 0, 50% 0, 50% 50%) }
      73.333333% { clip-path: polygon(0 0, 50% 0, 50% 50%) }
      73.333334% { clip-path: polygon(0 0, 50% 0, 50% 50%, 0 0) }
      80.000000% { clip-path: polygon(0 0, 50% 0, 50% 50%, 0 100%) }
      80.000001% { clip-path: polygon(0 0, 50% 0, 50% 50%, 0% 100%, 0 100%) }
      86.666666% { clip-path: polygon(0 0, 50% 0, 50% 50%, 100% 100%, 0 100%) }
      86.666667% { clip-path: polygon(0 0, 50% 0, 50% 50%, 100% 100%, 100% 100%, 0 100%) }
      93.333333% { clip-path: polygon(0 0, 50% 0, 50% 50%, 100% 0, 100% 100%, 0 100%) }
      93.333334% { clip-path: polygon(0 0, 50% 0, 50% 50%, 100% 0, 100% 0, 100% 100%, 0 100%) }
      100%       { clip-path: polygon(0 0, 50% 0, 50% 50%, 50% 0, 100% 0, 100% 100%, 0 100%) }
    }
    @media screen and (max-width: 500px) {
      .h5-container, #biliMainHeader {
        display: none;
      }
      .error-container {
        display: block;
      }
    }

    img[src=""], img:not([src]) {
      opacity: 0;
    }
    .up-info-container {
      display: flex
    }
    .up-info-container .up-avatar-wrap {
      width: 48px;
      height: 48px;
      border-radius: 50%;
      overflow: hidden;
    }
    .up-info-container .up-avatar-wrap .up-avatar {
      width: 100%;
      height: 100%;
    }
    .up-info-container .up-detail {
      margin-left: 12px;
      padding-top: 4px;
    }
    .up-info-container .up-detail .up-detail-top {
      color: #FB7299;
      font-size: 15px;
      font-weight: 500;
    }
    .up-info-container .up-detail .up-detail-down {
      margin-top: 4px;
      color: #9499a0;
      font-size: 13px;
    }

    .video-info-container {
      margin-top: 12px;
    }
    .video-info-container .video-info-title {
      display: inline-flex;
      font-size: 20px;
      font-weight: 500;
      color: #18191C;
      line-height: 28px;
      max-width: 700px;
    }
    .video-info-title:before {
      content: '';
      display: block;
      width: 700px;
      height: 28px;
    }
    .video-info-title .video-title {
      position: absolute;
      background: #fff;
      border-radius: 7px;
      z-index: 100;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      max-width: 700px;
    }
    .video-info-title:hover .video-title, .video-title:hover {
      white-space: normal;
    }
    .video-info-container .video-meta {
      margin-top: 6px;
      display: flex;
      color: #9499a0;
      font-size: 13px;
    }
    .video-info-container .video-meta > .item {
      display: inline-flex;
      flex-shrink: 0;
      margin-right: 12px;
      overflow: hidden;
    }
    .video-info-container .video-meta > .item .icon{
      flex-shrink: 0;
      margin-right: 4px;
    }

    .player-wrap {
      margin-top: 10px;
      display: flex;
    }
    .bpx-player video {
      width: 100%;
      background: black;
    }
    .bpx-player {
      position: relative;
    }
    .bpx-player-video-area {
      position: relative;
    }
    .bpx-player-tooltip-incenter {
      position: absolute;
      top: 0;
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      pointer-events: none;
    }

    .bpx-player-top-wrap {
      display: none;
      left: 0;
      pointer-events: none;
      position: absolute;
      top: 0;
      color: #fff;
      transition: all .2s ease-in-out;
      width: 100%;
      z-index: 45;
    }
    .bpx-player.hover .bpx-player-top-wrap {
      display: flex;
    }
    .bpx-player-top-left {
      left: 12px;
      margin-top: 18px;
      position: absolute;
    }
    .bpx-player-top-left-title {
      display: none;
      font-size: 16px;
      font-weight: 500;
      line-height: 24px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      width: 100%!important;
      z-index: 2;
    }
    .bpx-player.bpx-state-fullscreen .bpx-player-top-left-title {
      display: block;
    }
    .bpx-player-follow {
      -webkit-box-align: center;
      -ms-flex-align: center;
      -webkit-box-flex: 0;
      align-items: center;
      background-color: rgba(0,0,0,.4);
      border-radius: 26px;
      cursor: pointer;
      display: -webkit-box;
      display: -ms-flexbox;
      display: flex;
      -ms-flex: 0;
      flex: 0;
      font-size: 12px;
      font-weight: 400;
      width: fit-content;
      height: 32px;
      line-height: 32px;
      margin-top: 5px;
      pointer-events: all;
      text-align: center;
      z-index: 2;
      padding-right: 5px;
    }
    .bpx-player-follow-face {
      -webkit-box-flex: 0;
      border-radius: 50%;
      -ms-flex: none;
      flex: none;
      height: 24px;
      margin-left: 4px;
      vertical-align: bottom;
      width: 24px;
    }
    .bpx-player-follow-text {
      -webkit-box-flex: 0;
      -ms-flex: none;
      flex: none;
      margin-left: 5px;
    }

    .bpx-player-state-wrap {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      z-index: 48;
      cursor: pointer;
      pointer-events: none;
    }
    .bpx-player.bpx-state-paused .bpx-player-state-play {
      display: block;
      position: absolute;
      right: 34px;
      bottom: 62px;
      background: url(//s1.hdslb.com/bfs/static/player/img/play.svg) 50% no-repeat;
      height: 64px;
      width: 64px;
    }
    .bpx-player-state-buff-icon {
      display: none;
      width: 24px;
      height: 24px;
    }
    .bpx-player-state-buff-text {
      display: none;
      color: #fff;
      font-size: 14px;
      line-height: 1;
      margin-top: 8px;
      text-shadow: 0 1px 2px rgba(0,0,0,.7);
    }
    .bpx-player-state-buff-icon svg > g:nth-child(1) > g { animation: opacity-gradient 1s ease-in-out infinite }
    .bpx-player-state-buff-icon svg > g:nth-child(1) > g:nth-child(2) { animation-delay: 0.1s }
    .bpx-player-state-buff-icon svg > g:nth-child(1) > g:nth-child(3) { animation-delay: 0.2s }
    .bpx-player-state-buff-icon svg > g:nth-child(2) { 
      animation: circle-spread 3s ease-in-out infinite; 
    }
    .bpx-player.bpx-state-buff .bpx-player-state-buff-icon, 
    .bpx-player.bpx-state-buff .bpx-player-state-buff-text {
      display: block;
    }
    .bpx-player-loading-panel {
      background-color: #000;
      display: none;
      height: 100%;
      left: 0;
      position: absolute;
      top: 0;
      width: 100%;
      z-index: 57;
    }
    .bpx-player-loading-panel.bpx-state-loading {
      display: block;
    }
    .bpx-player-loading-panel-blur {
      -webkit-box-align: center;
      -ms-flex-align: center;
      -webkit-box-pack: center;
      -ms-flex-pack: center;
      align-items: center;
      display: -webkit-box;
      display: -ms-flexbox;
      display: flex;
      height: 100%;
      justify-content: center;
      pointer-events: none;
      position: relative;
      width: 100%;
    }
    .bpx-player-loading-panel-blur-detail {
      -webkit-animation: loading .94s steps(1) infinite;
      animation: loading .94s steps(1) infinite;
      background: url(//s1.hdslb.com/bfs/static/player/img/ploading.png) no-repeat;
      height: 184px;
      -webkit-transform: scale(.5);
      transform: scale(.5);
      width: 320px;
    }

    .bpx-player-control {
      bottom: 0;
      left: 0;
      position: absolute;
      width: 100%;
      z-index: 75;
    }

    .bpx-player-control-mask {
      background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAADGCAYAAAAT+OqFAAAAdklEQVQoz42QQQ7AIAgEF/T/D+kbq/RWAlnQyyazA4aoAB4FsBSA/bFjuF1EOL7VbrIrBuusmrt4ZZORfb6ehbWdnRHEIiITaEUKa5EJqUakRSaEYBJSCY2dEstQY7AuxahwXFrvZmWl2rh4JZ07z9dLtesfNj5q0FU3A5ObbwAAAABJRU5ErkJggg==) repeat-x bottom;
      bottom: 0;
      height: 100px;
      left: 0;
      pointer-events: none;
      position: absolute;
      width: 100%;
      z-index: -1;
      opacity: 0;
      transition: opacity .2s ease-in;
    }
    .bpx-player.hover .bpx-player-control-mask,
    .bpx-player:has(.control-btn:hover) .bpx-player-control-mask,
    .bpx-player:has(.bpx-player-progress:hover) .bpx-player-control-mask,
    .bpx-player.hover .bpx-player-control-bottom,
    .bpx-player:has(.control-btn:hover) .bpx-player-control-bottom, 
    .bpx-player:has(.bpx-player-progress:hover) .bpx-player-control-bottom {
      opacity: 1;
    }

    .bpx-player-control-top {
      position: absolute;
      left: 0;
      right: 0;
      bottom: 44px;
      box-sizing: border-box;
      padding: 0 12px;
    }
    .bpx-player:not(.hover) .bpx-player-control-top {
      bottom: 0;
    }
    .bpx-player-progress {
      margin-bottom: 6px;
      align-items: center;
      display: flex;
      height: 4px;
      position: relative;
      transition: transform .1s cubic-bezier(0,0,.2,1);
      width: 100%;
    }
    .bpx-player-progress.active, .bpx-player-progress:hover {
      height: 6px;
    }
    .bpx-player-progress .schedule {
      width: 100%;
      height: 100%;
      position: absolute;
      left: 0;
      right: 0;
      top: 0;
      bottom: 0;
      background-color: hsla(0, 0%, 100%, .2);
      border-radius: 1.5px;
      overflow: hidden;
      position: absolute;
      pointer-events: none;
    }
    .bpx-player-progress .buffer, .bpx-player-progress .current {
      bottom: 0;
      left: 0;
      position: absolute;
      right: 0;
      top: 0;
      -webkit-transform: scaleX(0);
      transform: scaleX(0);
      -webkit-transform-origin: 0 0;
      transform-origin: 0 0;
    }
    .bpx-player-progress .buffer {
      background-color: hsla(0, 0%, 100%, .3);
    }
    .bpx-player-progress .current {
      background-color: var(--bpx-primary-color, #00AEEC);
    }
    .bpx-player-progress .thumb {
      height: 20px;
      width: 20px;
      line-height: 12px;
    }
    .bpx-player-progress .thumb-icon {
      transform: translateX(-50%) scale(0);
      transition: transform .2s;
    }
    .bpx-player-progress.active .thumb-icon {
      transform: translateX(-50%) scale(1);
    }
    .bpx-player-progress .move-indicator {
      height: 16px;
      margin-left: -4px;
      overflow: hidden;
      opacity: 0;
      position: absolute;
      width: 8px;
      pointer-events: none;
    }
    .bpx-player-progress.active .move-indicator {
      opacity: 1;
    }
    .bpx-player-progress .move-indicator > div {
      position: relative;
      border-style: solid;
      width: 0;
      height: 0;
    }
    .bpx-player-progress .move-indicator > .down {
      border-color: var(--bpx-primary-color, #00AEEC) transparent transparent;
      border-width: 4px 4px 0;
    }
    .bpx-player-progress .move-indicator > .up {
      border-color: transparent transparent var(--bpx-primary-color, #00a1d6);
      border-width: 0 4px 4px;
      margin-top: 8px;
    }
    .bpx-player-progress .popup {
      display: none;
      width: 160px;
      position: absolute;
      bottom: 22px;
      border-radius: 2px;
      line-height: 36px;
      pointer-events: none;
    }
    .bpx-player-progress.active .popup {
      display: block;
    }
    .bpx-player-progress .popup .preview {
      background-color: transparent;
      position: relative;
      width: 160px;
      height: 90px;
      transform: translateX(-50%);
      pointer-events: none;
    }
    .bpx-player-progress .popup .preview-image {
      background-color: black;
      height: 100%;
      margin: 0 auto;
      position: relative;
      width: 100%;
      object-fit: scale-down;
      pointer-events: none;
      user-select: none;
    }
    .bpx-player-progress .popup .preview-time {
      display: inline-block;
      position: absolute;
      left: 50%;
      bottom: 0;
      color: #fff;
      height: 18px;
      padding: 0 5px;
      background-color: hsla(0, 0%, 8%, .9);
      border-radius: 2px;
      font-size: 12px;
      line-height: 18px;
      transform: translateX(-50%);
      pointer-events: none;
      user-select: none;
    }

    .bpx-player-control-bottom {
      box-sizing: border-box;
      display: flex;
      height: 35px;
      justify-content: space-between;
      line-height: 22px;
      margin: 20px 0 0;
      padding: 0 12px;
      width: 100%;
      opacity: 0;
      transition: opacity .2s ease-in;
    }
    .bpx-player-control-bottom-left {
      display: inline-flex;
      flex: none;
    }
    .bpx-player-control-bottom-right {
      display: flex;
      justify-content: flex-end;
    }
    .bpx-player-control-bottom .control-btn {
      width: 36px;
      height: 22px;
      fill: hsla(0, 0%, 100%, .8);
      color: hsla(0, 0%, 100%, .8);
      font-size: 0;
      line-height: 22px;
      outline: 0;
      position: relative;
      text-align: center;
      z-index: 2;
    }
    .bpx-player-control-bottom .control-btn:hover {
      fill: #fff;
      color: #fff;
    }
    .bpx-player-control-bottom .control-btn > .icon {
      width: 100%;
      height: 22px;
      cursor: pointer;
    }
    .bpx-player-control-bottom .control-btn > .icon > svg {
      width: 100%;
      height: 100%;
      transition: fill .15s ease-in-out, opacity .15s ease-in-out;
      opacity: 1;
    }

    .bpx-player-playrate-hint {
      -webkit-box-pack: center;
      -ms-flex-pack: center;
      background-color: rgba(33, 33, 33, .9);
      border-radius: 4px;
      color: #fff;
      display: -webkit-box;
      display: -ms-flexbox;
      display: flex;
      height: 34px;
      justify-content: center;
      left: 50%;
      line-height: 34px;
      margin-left: -65px;
      position: absolute;
      top: 18px;
      width: 130px;
      z-index: 77;
    }
    .bpx-player-playrate-hint .icon {
      display: flex;
      margin-right: 8px;
      width: 30px;
    }
    .bpx-player-playrate-hint .icon >svg > g > g { animation: opacity-gradient 1s ease-in-out infinite }
    .bpx-player-playrate-hint .icon >svg > g > g:nth-child(2) { animation-delay: 0.1s }
    .bpx-player-playrate-hint .icon >svg > g > g:nth-child(3) { animation-delay: 0.2s }

    .control-btn.play > .icon > svg:nth-child(1) {
      position: absolute;
    }
    .control-btn.play > .icon > svg:nth-child(2) {
      opacity: 0;
    }
    .bpx-player.bpx-state-paused .control-btn.play> .icon > svg:nth-child(1) {
      opacity: 0;
    }
    .bpx-player.bpx-state-paused .control-btn.play> .icon > svg:nth-child(2) {
      opacity: 1;
    }

    .control-btn.time {
      font-size: 12px;
      margin-right: 10px;
      min-width: 90px;
    }
    .control-btn.time .seek {
      outline: none;
      text-decoration: none;
    }
    .control-btn.time .label {
      position: absolute;
      width: 100%;
      height: 100%;
      text-align: center;
      white-space: nowrap;
    }
    .control-btn.time .divide {
      padding: 0 2px;
    }
    .control-btn.volume .volume-box {
      display: none;
      background: hsla(0, 0%, 8%, .9);
      border-radius: 2px;
      bottom: 41px;
      height: 100px;
      left: 50%;
      margin-left: -16px;
      position: absolute;
      width: 32px;
    }
    .control-btn.volume .volume-number {
      color: #e5e9ef;
      font-size: 12px;
      height: 28px;
      line-height: 28px;
      margin-bottom: 2px;
      text-align: center;
      width: 100%;
    }
    .control-btn.volume .volume-slider {
      height: 60px;
      margin: 0 auto;
      cursor: pointer;
      display: flex;
      justify-content: center;
    }
    .control-btn.volume .track {
      position: relative;
      display: flex;
      width: 2px;
      height: 100%;
      align-items: flex-end;
      pointer-events: none;
    }
    .control-btn.volume .bar-wrap {
      background: #e7e7e7;
      border-radius: 1.5px;
      bottom: 0;
      left: 0;
      overflow: hidden;
      position: absolute;
      right: 0;
      top: 0;
      pointer-events: none;
    }
    .control-btn.volume .bar {
      background: var(--bpx-fn-color, #00a1d6);
      transform-origin: 0 100%;
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0; 
      left: 0;
      pointer-events: none;
    }
    .control-btn.volume .thumb {
      position: absolute;
      top: 0;
      border-radius: 50%;
      pointer-events: none;
    }
    .control-btn.volume .thumb-dot {
      width: var(--bpx-ui-font-size, 12px);
      height: var(--bpx-ui-font-size, 12px);
      background-color: var(--bpx-fn-color, #00a1d6);
      border-radius: 50%;
      display: flex;
      transition: all .2s;
      vertical-align: middle;
      align-items: flex-end;
      pointer-events: none;
      transform: translate(-47%, -50%);
    }
    .control-btn.volume.hover .volume-box, 
    .control-btn.volume:hover .volume-box, 
    .volume-box:hover {
      display: block;
    }
    .control-btn.playbackrate {
      cursor: pointer;
      font-size: 14px;
      font-weight: 600;
    }
    .control-btn .playbackrate-menu {
      list-style: none;
      outline: none;
      background-color: hsla(0, 0%, 8%, .9);
      border-radius: 2px;
      bottom: 41px;
      -webkit-box-sizing: border-box;
      box-sizing: border-box;
      display: none;
      left: 50%;
      margin: 0;
      padding: 0;
      position: absolute;
      text-align: center;
      -webkit-transform: translateX(-50%);
      transform: translateX(-50%);
      width: 70px;
    }
    .control-btn.playbackrate.hover .playbackrate-menu, 
    .control-btn.playbackrate:hover .playbackrate-menu, 
    .playbackrate-menu:hover {
      display: block;
    }
    .control-btn .playbackrate-menu > .item {
      font-size: 12px;
      cursor: pointer;
      height: 36px;
      line-height: 36px;
      position: relative;
    }
    .control-btn .playbackrate-menu > .item:hover {
      background-color: rgba(255, 255, 255, .1);
    }
    .control-btn .playbackrate-menu > .item.active {
      color: var(--bpx-primary-color, #00a1d6);
    }

    .player-wrap .video-controls {
      display: flex;
      position: relative;
      flex-direction: column;
      justify-content: center;
      margin-left: 5px;
    }
    .player-wrap .video-controls > .item {
      position: relative;
      transform: rotate(90deg);
      border-radius: 5px;
      background: var(--text2, #61666D);
      width: 28px;
      height: 28px;
      font-size: 20px;
      font-weight: 1000;
      display: flex;
      justify-content: center;
      color: white;
      margin-bottom: 5px;
      user-select: none !important;
    }
    .player-wrap .video-controls > .item:hover {
      background: var(--brand_blue, #00AEEC);
    }

    .player-wrap .video-controls > .item.goto {
      position: absolute;
      top: 0;
      transform: unset;
    }
    .player-wrap .video-controls > .item.goto .goto-form {
      display: none;
      position: absolute;
      left: 35px;
      transform: translateY(-7px);
    }
    .video-controls .item.goto:hover .goto-form,
    .video-controls .item.goto.hover .goto-form, 
    .goto-form:hover {
      display: block;
    }
    .goto-form .goto-input {
      display: block;
      width: 120px;
    }
    .goto-form .goto-confirm {
      margin-top: 3px;
    }
    .goto-form .goto-tip {
      font-size: 12px;
      color: black;
      font-weight: normal;
      margin-left: 5px;
    }

    .bpx-player-tooltip-area {
      position: relative;
    }
    .bpx-player-tooltip-item {
      background-color: #000;
      border-radius: 2px;
      color: #fff;
      cursor: default;
      font-size: 12px;
      line-height: 1.5;
      max-width: 18em;
      opacity: 0;
      padding: 6px 8px;
      pointer-events: none;
      position: absolute;
      user-select: none;
      width: fit-content;
      word-wrap: break-word;
      word-break: break-all;
      z-index: 12000;
      transform: translateY(5px);
      transition: opacity .15s ease-in-out, transform .15s ease-in-out;
    }
    .bpx-player:has(.control-btn.previous:hover) .bpx-player-tooltip-item.previous,
    .bpx-player:has(.control-btn.next:hover) .bpx-player-tooltip-item.next,
    .bpx-player:has(.control-btn.fullscreen:hover) .bpx-player-tooltip-item.fullscreen {
      opacity: 1;
      transform: translateY(0);
    }

    #arc_toolbar_report {
      width: 700px;
      border-bottom: 1px solid #E3E5E7;
    }
    #arc_toolbar_report .video-toolbar {
      display: flex;
      padding-top: 16px;
      padding-bottom: 12px;
    }
    #arc_toolbar_report .video-toolbar > .item {
      position: relative;
      margin-right: 8px;
      display: flex;
      align-items: center;
      width: 92px;
      height: 28px;
      transition: all .3s;
      font-size: 13px;
      font-weight: 500;
      color: var(--text2, #61666D);
      cursor: pointer;
    }
    #arc_toolbar_report .video-toolbar > .item.on, 
    #arc_toolbar_report .video-toolbar > .item:hover {
      color: var(--brand_blue, #00AEEC);
    }
    #arc_toolbar_report .video-toolbar > .item > .icon {
      flex-shrink: 0;
      width: 28px;
      height: 28px;
      margin-right: 8px;
    }
    #arc_toolbar_report .video-toolbar > .item.share > .text {
      opacity: 1;
      transform: translateY(0px);
      transition: all .3s;
      color: var(--text2, #61666D);
    }
    #arc_toolbar_report .video-toolbar > .item.share > .copy-tip {
      position: absolute;
      left: 36px;
      opacity: 0;
      transform: translateY(15px);
      transition: transform .3s, opacity .3s;
      color: var(--brand_blue, #00AEEC);
    }
    #arc_toolbar_report .video-toolbar > .item.share:hover > .text {
      opacity: 0;
      transform: translateY(-15px);
      color: var(--brand_blue, #00AEEC);
    }
    #arc_toolbar_report .video-toolbar > .item.share:hover > .copy-tip {
      opacity: 1;
      transform: translateY(0px);
    }

    .video-desc-container {
      margin: 16px 0;
    }
    .video-desc-container .basic-desc-info {
      white-space: pre-line;
      letter-spacing: 0;
      color: var(--text1, #18191c);
      font-size: 15px;
      line-height: 24px;
      overflow: hidden;
      word-break: break-all;
      line-break: anywhere;
    }
    .video-desc-container .basic-desc-info a {
      color: var(--brand_blue, #00aeec);
    }

    @media screen and (max-width: 500px) {
      .video-info-container, .up-info-container, #arc_toolbar_report, .video-desc-container {
        display: none;
      }
      .player-wrap {
        position: absolute;
        top: 0;
        left: 0;
        margin-top: 0;
      }
      .video-controls {
        position: fixed;
        top: 50%;
        right: 5px;
        z-index: 100;
      }
    }

    @keyframes roll {
      0% { transform: translateX(0) translateZ(0); }
      100% { transform: translateX(var(--translateX)) translateZ(0); }
    }
    @keyframes disappear {
      0% { opacity: 1; }
      99% { opacity: 1; }
      100% { opacity: 0; }
    }
    .bpx-player-row-dm-wrap {
      cursor: pointer;
      height: 100%;
      left: 0;
      -webkit-mask-position: center;
      mask-position: center;
      overflow: hidden;
      pointer-events: none;
      position: absolute;
      top: 0;
      -webkit-user-select: none;
      -moz-user-select: none;
      -ms-user-select: none;
      user-select: none;
      width: 100%;
      z-index: 2;
      -webkit-box-pack: center;
      -ms-flex-pack: center;
      -webkit-box-align: center;
      -ms-flex-align: center;
      align-items: center;
      display: -webkit-box;
      display: -ms-flexbox;
      display: flex;
      justify-content: center;
      z-index: 11;
    }
    
    .bili-danmaku-x-dm {
      user-select: none;
      white-space: pre;
      position: absolute;
      line-height: 1.125;
      perspective: 500px;
      transform: translate(-50%, var(--translateY, 0));
      font-family: SimHei, 'Microsoft JhengHei', Arial, Helvetica, sans-serif;
      font-weight: bold;
      font-size: var(--fontSize, 25px);
      left: var(--offset, -10px);
      color: var(--color, #ffffff);
      text-shadow: 1px 0 1px #000000,0 1px 1px #000000,0 -1px 1px #000000,-1px 0 1px #000000;
      transform: translateZ(0);
      top: var(--top, 0);
      z-index: var(--zIndex, 200);
      will-change: transform, opacity, top, left;
      display: -webkit-box;
      display: -ms-flexbox;
      display: flex;
      -webkit-box-align: center;
      -ms-flex-align: center;
      align-items: center;
    }
    .bili-danmaku-x-dm.bili-danmaku-x-center  {
      top: 0;
      left: 50%;
      transform: translate(-50%, var(--translateY, 0));
      animation: disappear linear var(--duration, 8.5s) forwards;
    }
    .bili-danmaku-x-dm.bili-danmaku-x-roll {
      left: 100%;
      animation: roll linear var(--duration, 8.5s) forwards;
    }
    .bpx-state-paused .bili-danmaku-x-dm {
      animation-play-state: paused !important;
    }
`

  String.prototype.rsplit = function (sep, maxsplit) {
    let split = this.split(sep);
    return maxsplit ? [split.slice(0, -maxsplit).join(sep)].concat(split.slice(-maxsplit)) : split;
  }
  const md5sum = function (d) { let r = M(V(Y(X(d), 8 * d.length))); return r.toLowerCase() }; function M(d) { for (var _, m = "0123456789ABCDEF", f = "", r = 0; r < d.length; r++)_ = d.charCodeAt(r), f += m.charAt(_ >>> 4 & 15) + m.charAt(15 & _); return f } function X(d) { for (var _ = Array(d.length >> 2), m = 0; m < _.length; m++)_[m] = 0; for (m = 0; m < 8 * d.length; m += 8)_[m >> 5] |= (255 & d.charCodeAt(m / 8)) << m % 32; return _ } function V(d) { for (var _ = "", m = 0; m < 32 * d.length; m += 8)_ += String.fromCharCode(d[m >> 5] >>> m % 32 & 255); return _ } function Y(d, _) { d[_ >> 5] |= 128 << _ % 32, d[14 + (_ + 64 >>> 9 << 4)] = _; for (var m = 1732584193, f = -271733879, r = -1732584194, i = 271733878, n = 0; n < d.length; n += 16) { var h = m, t = f, g = r, e = i; f = md5_ii(f = md5_ii(f = md5_ii(f = md5_ii(f = md5_hh(f = md5_hh(f = md5_hh(f = md5_hh(f = md5_gg(f = md5_gg(f = md5_gg(f = md5_gg(f = md5_ff(f = md5_ff(f = md5_ff(f = md5_ff(f, r = md5_ff(r, i = md5_ff(i, m = md5_ff(m, f, r, i, d[n + 0], 7, -680876936), f, r, d[n + 1], 12, -389564586), m, f, d[n + 2], 17, 606105819), i, m, d[n + 3], 22, -1044525330), r = md5_ff(r, i = md5_ff(i, m = md5_ff(m, f, r, i, d[n + 4], 7, -176418897), f, r, d[n + 5], 12, 1200080426), m, f, d[n + 6], 17, -1473231341), i, m, d[n + 7], 22, -45705983), r = md5_ff(r, i = md5_ff(i, m = md5_ff(m, f, r, i, d[n + 8], 7, 1770035416), f, r, d[n + 9], 12, -1958414417), m, f, d[n + 10], 17, -42063), i, m, d[n + 11], 22, -1990404162), r = md5_ff(r, i = md5_ff(i, m = md5_ff(m, f, r, i, d[n + 12], 7, 1804603682), f, r, d[n + 13], 12, -40341101), m, f, d[n + 14], 17, -1502002290), i, m, d[n + 15], 22, 1236535329), r = md5_gg(r, i = md5_gg(i, m = md5_gg(m, f, r, i, d[n + 1], 5, -165796510), f, r, d[n + 6], 9, -1069501632), m, f, d[n + 11], 14, 643717713), i, m, d[n + 0], 20, -373897302), r = md5_gg(r, i = md5_gg(i, m = md5_gg(m, f, r, i, d[n + 5], 5, -701558691), f, r, d[n + 10], 9, 38016083), m, f, d[n + 15], 14, -660478335), i, m, d[n + 4], 20, -405537848), r = md5_gg(r, i = md5_gg(i, m = md5_gg(m, f, r, i, d[n + 9], 5, 568446438), f, r, d[n + 14], 9, -1019803690), m, f, d[n + 3], 14, -187363961), i, m, d[n + 8], 20, 1163531501), r = md5_gg(r, i = md5_gg(i, m = md5_gg(m, f, r, i, d[n + 13], 5, -1444681467), f, r, d[n + 2], 9, -51403784), m, f, d[n + 7], 14, 1735328473), i, m, d[n + 12], 20, -1926607734), r = md5_hh(r, i = md5_hh(i, m = md5_hh(m, f, r, i, d[n + 5], 4, -378558), f, r, d[n + 8], 11, -2022574463), m, f, d[n + 11], 16, 1839030562), i, m, d[n + 14], 23, -35309556), r = md5_hh(r, i = md5_hh(i, m = md5_hh(m, f, r, i, d[n + 1], 4, -1530992060), f, r, d[n + 4], 11, 1272893353), m, f, d[n + 7], 16, -155497632), i, m, d[n + 10], 23, -1094730640), r = md5_hh(r, i = md5_hh(i, m = md5_hh(m, f, r, i, d[n + 13], 4, 681279174), f, r, d[n + 0], 11, -358537222), m, f, d[n + 3], 16, -722521979), i, m, d[n + 6], 23, 76029189), r = md5_hh(r, i = md5_hh(i, m = md5_hh(m, f, r, i, d[n + 9], 4, -640364487), f, r, d[n + 12], 11, -421815835), m, f, d[n + 15], 16, 530742520), i, m, d[n + 2], 23, -995338651), r = md5_ii(r, i = md5_ii(i, m = md5_ii(m, f, r, i, d[n + 0], 6, -198630844), f, r, d[n + 7], 10, 1126891415), m, f, d[n + 14], 15, -1416354905), i, m, d[n + 5], 21, -57434055), r = md5_ii(r, i = md5_ii(i, m = md5_ii(m, f, r, i, d[n + 12], 6, 1700485571), f, r, d[n + 3], 10, -1894986606), m, f, d[n + 10], 15, -1051523), i, m, d[n + 1], 21, -2054922799), r = md5_ii(r, i = md5_ii(i, m = md5_ii(m, f, r, i, d[n + 8], 6, 1873313359), f, r, d[n + 15], 10, -30611744), m, f, d[n + 6], 15, -1560198380), i, m, d[n + 13], 21, 1309151649), r = md5_ii(r, i = md5_ii(i, m = md5_ii(m, f, r, i, d[n + 4], 6, -145523070), f, r, d[n + 11], 10, -1120210379), m, f, d[n + 2], 15, 718787259), i, m, d[n + 9], 21, -343485551), m = safe_add(m, h), f = safe_add(f, t), r = safe_add(r, g), i = safe_add(i, e) } return Array(m, f, r, i) } function md5_cmn(d, _, m, f, r, i) { return safe_add(bit_rol(safe_add(safe_add(_, d), safe_add(f, i)), r), m) } function md5_ff(d, _, m, f, r, i, n) { return md5_cmn(_ & m | ~_ & f, d, _, r, i, n) } function md5_gg(d, _, m, f, r, i, n) { return md5_cmn(_ & f | m & ~f, d, _, r, i, n) } function md5_hh(d, _, m, f, r, i, n) { return md5_cmn(_ ^ m ^ f, d, _, r, i, n) } function md5_ii(d, _, m, f, r, i, n) { return md5_cmn(m ^ (_ | ~f), d, _, r, i, n) } function safe_add(d, _) { var m = (65535 & d) + (65535 & _); return (d >> 16) + (_ >> 16) + (m >> 16) << 16 | 65535 & m } function bit_rol(d, _) { return d << _ | d >>> 32 - _ }
  const isNumber = s => Object.prototype.toString.call(s) === "[object Number]";
  const isString = s => Object.prototype.toString.call(s) === "[object String]";
  const isArrayLike = s => s != null && typeof s[Symbol.iterator] === 'function';
  function formatDateTime(d) {
    const formatter = new Intl.DateTimeFormat("zh-CN", {
      timeZone: "Asia/Shanghai",
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    })
    return formatter.format(d).replaceAll('/', '-')
  }
  function formatTime(t) {
    let s = Math.floor(t % 60);
    if (s < 10) s = '0' + s;
    let m = Math.floor(t / 60 % 60);
    if (m < 10) m = '0' + m;
    let h = Math.floor(t / 3600);
    if (h < 10) h = '0' + h;
    if (h > 0) return h + ':' + m + ':' + s;
    return m + ':' + s;
  }
  function getCookie(name) {
    var match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
    if (match) return match[2];
  }
  function isMobile() {
    if(navigator && navigator.userAgent) return /Mobi|Android|iPhone/i.test(navigator.userAgent);
    return window.innerWidth <= 300;
  }
  /**
   * 创建 Element
   * @param {String} tagName 
   * @param {Object} options 
   * @param {function} func 
   * @returns {SVGElement | HTMLElement}
   */
  function tag(tagName, options, func) {
    options = options || {};
    var svgTags = ['svg', 'g', 'path', 'filter', 'animate', 'marker', 'line', 'polyline', 'rect', 'circle', 'ellipse', 'polygon'];
    let newElement;
    if (svgTags.indexOf(tagName) >= 0) {
      newElement = document.createElementNS("http://www.w3.org/2000/svg", tagName);
    } else {
      newElement = document.createElement(tagName);
    }
    if (options.id) newElement.id = options.id;
    if (options.class) {
      if (!Array.isArray(options.class)) options.class = options.class.split(' ');
      for (const e of options.class) {
        if (e) newElement.classList.add(e);
      }
    }
    if (options.innerHTML) newElement.innerHTML = options.innerHTML;
    if (options.innerText) newElement.innerText = options.innerText;
    if (options.children) {
      if (!isArrayLike(options.children)) options.children = [options.children];
      for (let e of options.children) {
        if (isString(e) || isNumber(e)) e = document.createTextNode(e);
        newElement.appendChild(e);
      }
    }
    if (options.style) newElement.style.cssText = options.style
    if (options.attrs) {
      for (const [k, v] of Object.entries(options.attrs)) {
        newElement.setAttribute(k, v)
      }
    }
    func && func(newElement)
    return newElement;
  }

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
      this.config = JSON.parse(window.localStorage.getItem('bpx_player_profile') || '{"media":{"volume":"1","nonzeroVol":"1","autoplay":true}}');
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
      this.startListening();
    }

    createElements() {
      this.playerElement = tag('div', {
        class: 'bpx-player',
        children: [
          tag('div', {
            class: 'bpx-player-video-area', children: [
              tag('div', {
                class: 'bpx-player-video-wrap', 
              }),
              tag('div', {
                class: 'bpx-player-row-dm-wrap',
              }),
              tag('div', {
                class: 'bpx-player-state-wrap', children: [
                  tag('div', { class: 'bpx-player-state-play' }),
                  tag('div', {
                    class: 'bpx-player-state-buff-icon', children: tag('svg', {
                      attrs: { viewBox: '0 0 24 24' },
                      innerHTML: '<g transform="matrix(1,0,0,1,0,0)"><g transform="matrix(1,0,0,1,9.875,11.25)"opacity="1"style=""><g opacity="1"transform="matrix(1,0,0,1,-2.2850000858306885,2.7149999141693115)"><path fill="rgb(0,161,214)"fill-opacity="1"d=" M0,-1.4019999504089355 C-0.7739999890327454,-1.4019999504089355 -1.4019999504089355,-0.7739999890327454 -1.4019999504089355,0 C-1.4019999504089355,0.7739999890327454 -0.7739999890327454,1.4019999504089355 0,1.4019999504089355 C0.7739999890327454,1.4019999504089355 1.4019999504089355,0.7739999890327454 1.4019999504089355,0 C1.4019999504089355,-0.7739999890327454 0.7739999890327454,-1.4019999504089355 0,-1.4019999504089355z"></path><path stroke-linecap="butt"stroke-linejoin="miter"fill-opacity="0"stroke-miterlimit="4"stroke="rgb(69,69,69)"stroke-opacity="1"stroke-width="0"d=" M0,-1.4019999504089355 C-0.7739999890327454,-1.4019999504089355 -1.4019999504089355,-0.7739999890327454 -1.4019999504089355,0 C-1.4019999504089355,0.7739999890327454 -0.7739999890327454,1.4019999504089355 0,1.4019999504089355 C0.7739999890327454,1.4019999504089355 1.4019999504089355,0.7739999890327454 1.4019999504089355,0 C1.4019999504089355,-0.7739999890327454 0.7739999890327454,-1.4019999504089355 0,-1.4019999504089355z"></path></g></g><g transform="matrix(1,0,0,1,14.406000137329102,11.25)"opacity="1"><g opacity="1"transform="matrix(1,0,0,1,-2.2850000858306885,2.7149999141693115)"><path fill="rgb(0,161,214)"fill-opacity="1"d=" M0,-1.4019999504089355 C-0.7739999890327454,-1.4019999504089355 -1.4019999504089355,-0.7739999890327454 -1.4019999504089355,0 C-1.4019999504089355,0.7739999890327454 -0.7739999890327454,1.4019999504089355 0,1.4019999504089355 C0.7739999890327454,1.4019999504089355 1.4019999504089355,0.7739999890327454 1.4019999504089355,0 C1.4019999504089355,-0.7739999890327454 0.7739999890327454,-1.4019999504089355 0,-1.4019999504089355z"></path><path stroke-linecap="butt"stroke-linejoin="miter"fill-opacity="0"stroke-miterlimit="4"stroke="rgb(69,69,69)"stroke-opacity="1"stroke-width="0"d=" M0,-1.4019999504089355 C-0.7739999890327454,-1.4019999504089355 -1.4019999504089355,-0.7739999890327454 -1.4019999504089355,0 C-1.4019999504089355,0.7739999890327454 -0.7739999890327454,1.4019999504089355 0,1.4019999504089355 C0.7739999890327454,1.4019999504089355 1.4019999504089355,0.7739999890327454 1.4019999504089355,0 C1.4019999504089355,-0.7739999890327454 0.7739999890327454,-1.4019999504089355 0,-1.4019999504089355z"></path></g></g><g transform="matrix(1,0,0,1,19.0939998626709,11.25)"opacity="1"><g opacity="1"transform="matrix(1,0,0,1,-2.2850000858306885,2.7149999141693115)"><path fill="rgb(0,161,214)"fill-opacity="1"d=" M0,-1.4019999504089355 C-0.7739999890327454,-1.4019999504089355 -1.4019999504089355,-0.7739999890327454 -1.4019999504089355,0 C-1.4019999504089355,0.7739999890327454 -0.7739999890327454,1.4019999504089355 0,1.4019999504089355 C0.7739999890327454,1.4019999504089355 1.4019999504089355,0.7739999890327454 1.4019999504089355,0 C1.4019999504089355,-0.7739999890327454 0.7739999890327454,-1.4019999504089355 0,-1.4019999504089355z"></path><path stroke-linecap="butt"stroke-linejoin="miter"fill-opacity="0"stroke-miterlimit="4"stroke="rgb(69,69,69)"stroke-opacity="1"stroke-width="0"d=" M0,-1.4019999504089355 C-0.7739999890327454,-1.4019999504089355 -1.4019999504089355,-0.7739999890327454 -1.4019999504089355,0 C-1.4019999504089355,0.7739999890327454 -0.7739999890327454,1.4019999504089355 0,1.4019999504089355 C0.7739999890327454,1.4019999504089355 1.4019999504089355,0.7739999890327454 1.4019999504089355,0 C1.4019999504089355,-0.7739999890327454 0.7739999890327454,-1.4019999504089355 0,-1.4019999504089355z"></path></g></g></g><g><g transform="matrix(0.7071067690849304,0.7071067690849304,-0.7071067690849304,0.7071067690849304,9.609993934631348,8.918749809265137)"opacity="1"><g opacity="1"transform="matrix(1,0,0,1,-0.25999999046325684,-6.370999813079834)"><path fill="rgb(0,161,214)"fill-opacity="1"d=" M0,-3.388000011444092 C-0.40799999237060547,-3.388000011444092 -0.7390000224113464,-3.056999921798706 -0.7390000224113464,-2.6489999294281006 C-0.7390000224113464,-2.6489999294281006 -0.7390000224113464,2.6489999294281006 -0.7390000224113464,2.6489999294281006 C-0.7390000224113464,3.056999921798706 -0.40799999237060547,3.388000011444092 0,3.388000011444092 C0.40799999237060547,3.388000011444092 0.7390000224113464,3.056999921798706 0.7390000224113464,2.6489999294281006 C0.7390000224113464,2.6489999294281006 0.7390000224113464,-2.6489999294281006 0.7390000224113464,-2.6489999294281006 C0.7390000224113464,-3.056999921798706 0.40799999237060547,-3.388000011444092 0,-3.388000011444092z"></path><path stroke-linecap="butt"stroke-linejoin="miter"fill-opacity="0"stroke-miterlimit="4"stroke="rgb(69,69,69)"stroke-opacity="1"stroke-width="0"d=" M0,-3.388000011444092 C-0.40799999237060547,-3.388000011444092 -0.7390000224113464,-3.056999921798706 -0.7390000224113464,-2.6489999294281006 C-0.7390000224113464,-2.6489999294281006 -0.7390000224113464,2.6489999294281006 -0.7390000224113464,2.6489999294281006 C-0.7390000224113464,3.056999921798706 -0.40799999237060547,3.388000011444092 0,3.388000011444092 C0.40799999237060547,3.388000011444092 0.7390000224113464,3.056999921798706 0.7390000224113464,2.6489999294281006 C0.7390000224113464,2.6489999294281006 0.7390000224113464,-2.6489999294281006 0.7390000224113464,-2.6489999294281006 C0.7390000224113464,-3.056999921798706 0.40799999237060547,-3.388000011444092 0,-3.388000011444092z"></path></g></g><g transform="matrix(0.9840099811553955,0,0,1.070970058441162,12,13.75)"opacity="1"><g opacity="1"transform="matrix(1,0,0,1,0,0)"><path fill="rgb(11,163,149)"fill-opacity="0"d=" M-0.05000000074505806,-6.757999897003174 C-0.05000000074505806,-6.757999897003174 -3.0820000171661377,-6.72599983215332 -6.130000114440918,-6.72599983215332 C-9.178000450134277,-6.72599983215332 -10.121000289916992,-4.785999774932861 -10.121000289916992,-2.5850000381469727 C-10.121000289916992,-0.5540000200271606 -10.13700008392334,1.4800000190734863 -10.13700008392334,3.078000068664551 C-10.13700008392334,5.164999961853027 -9.178000450134277,6.815999984741211 -6.1620001792907715,6.815999984741211 C-4.13100004196167,6.815999984741211 3.609999895095825,6.822000026702881 6.0920000076293945,6.822000026702881 C9.145999908447266,6.822000026702881 10.270000457763672,5.164999961853027 10.270000457763672,3.072999954223633 C10.270000457763672,1.1979999542236328 10.28499984741211,-0.8349999785423279 10.28499984741211,-2.634999990463257 C10.28499984741211,-4.784999847412109 9.145999908447266,-6.7179999351501465 6.091000080108643,-6.7179999351501465 C4.247000217437744,-6.7179999351501465 -0.05000000074505806,-6.757999897003174 -0.05000000074505806,-6.757999897003174z"></path><path stroke-linecap="round"stroke-linejoin="round"fill-opacity="0"stroke="rgb(0,161,214)"stroke-opacity="1"stroke-width="1.5"d=" M-0.05000000074505806,-6.757999897003174 C-0.05000000074505806,-6.757999897003174 -3.0820000171661377,-6.72599983215332 -6.130000114440918,-6.72599983215332 C-9.178000450134277,-6.72599983215332 -10.121000289916992,-4.785999774932861 -10.121000289916992,-2.5850000381469727 C-10.121000289916992,-0.5540000200271606 -10.13700008392334,1.4800000190734863 -10.13700008392334,3.078000068664551 C-10.13700008392334,5.164999961853027 -9.178000450134277,6.815999984741211 -6.1620001792907715,6.815999984741211 C-4.13100004196167,6.815999984741211 3.609999895095825,6.822000026702881 6.0920000076293945,6.822000026702881 C9.145999908447266,6.822000026702881 10.270000457763672,5.164999961853027 10.270000457763672,3.072999954223633 C10.270000457763672,1.1979999542236328 10.28499984741211,-0.8349999785423279 10.28499984741211,-2.634999990463257 C10.28499984741211,-4.784999847412109 9.145999908447266,-6.7179999351501465 6.091000080108643,-6.7179999351501465 C4.247000217437744,-6.7179999351501465 -0.05000000074505806,-6.757999897003174 -0.05000000074505806,-6.757999897003174z"></path></g></g><g transform="matrix(0.7071067690849304,-0.7071067690849304,0.7071067690849304,0.7071067690849304,14.453581809997559,8.441146850585938)"opacity="1"><g opacity="1"transform="matrix(1,0,0,1,-0.25999999046325684,-6.370999813079834)"><path fill="rgb(0,161,214)"fill-opacity="1"d=" M0,-3.388000011444092 C-0.40799999237060547,-3.388000011444092 -0.7390000224113464,-3.056999921798706 -0.7390000224113464,-2.6489999294281006 C-0.7390000224113464,-2.6489999294281006 -0.7390000224113464,2.6489999294281006 -0.7390000224113464,2.6489999294281006 C-0.7390000224113464,3.056999921798706 -0.40799999237060547,3.388000011444092 0,3.388000011444092 C0.40799999237060547,3.388000011444092 0.7390000224113464,3.056999921798706 0.7390000224113464,2.6489999294281006 C0.7390000224113464,2.6489999294281006 0.7390000224113464,-2.6489999294281006 0.7390000224113464,-2.6489999294281006 C0.7390000224113464,-3.056999921798706 0.40799999237060547,-3.388000011444092 0,-3.388000011444092z"></path><path stroke-linecap="butt"stroke-linejoin="miter"fill-opacity="0"stroke-miterlimit="4"stroke="rgb(69,69,69)"stroke-opacity="1"stroke-width="0"d=" M0,-3.388000011444092 C-0.40799999237060547,-3.388000011444092 -0.7390000224113464,-3.056999921798706 -0.7390000224113464,-2.6489999294281006 C-0.7390000224113464,-2.6489999294281006 -0.7390000224113464,2.6489999294281006 -0.7390000224113464,2.6489999294281006 C-0.7390000224113464,3.056999921798706 -0.40799999237060547,3.388000011444092 0,3.388000011444092 C0.40799999237060547,3.388000011444092 0.7390000224113464,3.056999921798706 0.7390000224113464,2.6489999294281006 C0.7390000224113464,2.6489999294281006 0.7390000224113464,-2.6489999294281006 0.7390000224113464,-2.6489999294281006 C0.7390000224113464,-3.056999921798706 0.40799999237060547,-3.388000011444092 0,-3.388000011444092z"></path></g></g></g>'
                    })
                  }),
                  tag('div', {
                    class: 'bpx-player-state-buff-text', children: [
                      tag('span', { class: 'title', innerHTML: '正在缓冲...' }),
                      tag('span', { class: 'speed' }),
                    ]
                  })
                ]
              }),
              tag('div', {
                class: 'bpx-player-loading-panel bpx-state-loading', children: tag('div', {
                  class: 'bpx-player-loading-panel-blur',
                  children: tag('div', { class: 'bpx-player-loading-panel-blur-detail' }),
                })
              }),
              tag('div', {
                class: 'bpx-player-control', children: [
                  tag('div', { class: 'bpx-player-control-mask' }),
                  tag('div', {
                    class: 'bpx-player-control-top',
                    children: [
                      tag('div', {
                        class: 'bpx-player-progress',
                        children: [
                          tag('div', {
                            class: 'schedule', children: [
                              tag('div', { class: 'buffer' }),
                              tag('div', { class: 'current' })
                            ]
                          }),
                          tag('div', {
                            class: 'thumb',
                            children: tag('div', {
                              class: 'thumb-icon',
                              innerHTML: '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 18 18" width="18" height="18" preserveAspectRatio="xMidYMid meet" style="width: 100%; height: 100%; transform: translate3d(0px, 0px, 0px); content-visibility: visible;"><defs><clipPath id="__lottie_element_2"><rect width="18" height="18" x="0" y="0"></rect></clipPath></defs><g clip-path="url(#__lottie_element_2)"><g transform="matrix(1.333299994468689,0,0,1.333299994468689,0,0)" opacity="1" style="display: block;"><g opacity="1" transform="matrix(1,0,0,1,0,0)"><g opacity="1" transform="matrix(1,0,0,1,0,0)"><path fill="rgb(51,51,51)" fill-opacity="1" d=" M4.099999904632568,0.5199999809265137 C4.099999904632568,0.5199999809265137 5.570000171661377,2.0799999237060547 5.570000171661377,2.0799999237060547 C5.809999942779541,2.3399999141693115 5.78000020980835,2.759999990463257 5.5,3.009999990463257 C5.21999979019165,3.2699999809265137 4.789999961853027,3.2699999809265137 4.550000190734863,3.009999990463257 C4.550000190734863,3.009999990463257 3.0799999237060547,1.4500000476837158 3.0799999237060547,1.4500000476837158 C2.8299999237060547,1.190000057220459 2.869999885559082,0.7699999809265137 3.1500000953674316,0.5099999904632568 C3.430000066757202,0.25999999046325684 3.8499999046325684,0.25999999046325684 4.099999904632568,0.5199999809265137 C4.099999904632568,0.5199999809265137 4.099999904632568,0.5199999809265137 4.099999904632568,0.5199999809265137z"></path></g><g opacity="1" transform="matrix(1,0,0,1,0,0)"><path fill="rgb(51,51,51)" fill-opacity="1" d=" M10.5,1.4199999570846558 C10.5,1.4199999570846558 9.069999694824219,3.0399999618530273 9.069999694824219,3.0399999618530273 C8.829999923706055,3.309999942779541 8.369999885559082,3.309999942779541 8.039999961853027,3.0399999618530273 C7.710000038146973,2.7699999809265137 7.639999866485596,2.3399999141693115 7.869999885559082,2.069999933242798 C7.869999885559082,2.069999933242798 9.300000190734863,0.44999998807907104 9.300000190734863,0.44999998807907104 C9.529999732971191,0.18000000715255737 10,0.18000000715255737 10.329999923706055,0.44999998807907104 C10.65999984741211,0.7200000286102295 10.739999771118164,1.149999976158142 10.5,1.4199999570846558 C10.5,1.4199999570846558 10.5,1.4199999570846558 10.5,1.4199999570846558z"></path></g><g opacity="1" transform="matrix(1,0,0,1,0,0)"><path fill="rgb(255,255,255)" fill-opacity="1" d=" M11.989999771118164,4.880000114440918 C11.989999771118164,4.880000114440918 11.989999771118164,9.380000114440918 11.989999771118164,9.380000114440918 C11.989999771118164,10.420000076293945 11.140000343322754,11.25 10.109999656677246,11.25 C10.109999656677246,11.25 3.359999895095825,11.25 3.359999895095825,11.25 C2.319999933242798,11.25 1.4900000095367432,10.420000076293945 1.4900000095367432,9.380000114440918 C1.4900000095367432,9.380000114440918 1.4900000095367432,4.880000114440918 1.4900000095367432,4.880000114440918 C1.4900000095367432,3.8399999141693115 2.319999933242798,3 3.359999895095825,3 C3.359999895095825,3 10.109999656677246,3 10.109999656677246,3 C11.140000343322754,3 11.989999771118164,3.8399999141693115 11.989999771118164,4.880000114440918 C11.989999771118164,4.880000114440918 11.989999771118164,4.880000114440918 11.989999771118164,4.880000114440918z"></path></g><g opacity="1" transform="matrix(0.75,0,0,0.75,6.739999771118164,7.130000114440918)"><path stroke-linecap="butt" stroke-linejoin="miter" fill-opacity="0" stroke-miterlimit="4" stroke="rgb(51,51,51)" stroke-opacity="1" stroke-width="1.5" d=" M7,-3 C7,-3 7,3 7,3 C7,4.380000114440918 5.880000114440918,5.5 4.5,5.5 C4.5,5.5 -4.5,5.5 -4.5,5.5 C-5.880000114440918,5.5 -7,4.380000114440918 -7,3 C-7,3 -7,-3 -7,-3 C-7,-4.380000114440918 -5.880000114440918,-5.5 -4.5,-5.5 C-4.5,-5.5 4.5,-5.5 4.5,-5.5 C5.880000114440918,-5.5 7,-4.380000114440918 7,-3 C7,-3 7,-3 7,-3z"></path></g><g opacity="1" transform="matrix(1,0,0,1,0,0)"><path fill="rgb(51,51,51)" fill-opacity="1" d=" M5.440000057220459,6.260000228881836 C5.440000057220459,6.260000228881836 5.440000057220459,7.949999809265137 5.440000057220459,7.949999809265137 C5.440000057220459,8.3100004196167 5.139999866485596,8.600000381469727 4.78000020980835,8.600000381469727 C4.420000076293945,8.600000381469727 4.119999885559082,8.3100004196167 4.119999885559082,7.949999809265137 C4.119999885559082,7.949999809265137 4.119999885559082,6.260000228881836 4.119999885559082,6.260000228881836 C4.119999885559082,5.900000095367432 4.420000076293945,5.599999904632568 4.78000020980835,5.599999904632568 C5.139999866485596,5.599999904632568 5.440000057220459,5.900000095367432 5.440000057220459,6.260000228881836 C5.440000057220459,6.260000228881836 5.440000057220459,6.260000228881836 5.440000057220459,6.260000228881836z"></path></g><g opacity="1" transform="matrix(1,0,0,1,0,0)"><path fill="rgb(51,51,51)" fill-opacity="1" d=" M9.289999961853027,6.28000020980835 C9.289999961853027,6.28000020980835 9.289999961853027,7.929999828338623 9.289999961853027,7.929999828338623 C9.289999961853027,8.3100004196167 8.979999542236328,8.600000381469727 8.609999656677246,8.600000381469727 C8.239999771118164,8.600000381469727 7.940000057220459,8.3100004196167 7.940000057220459,7.929999828338623 C7.940000057220459,7.929999828338623 7.940000057220459,6.28000020980835 7.940000057220459,6.28000020980835 C7.940000057220459,5.900000095367432 8.239999771118164,5.599999904632568 8.609999656677246,5.599999904632568 C8.979999542236328,5.599999904632568 9.289999961853027,5.900000095367432 9.289999961853027,6.28000020980835 C9.289999961853027,6.28000020980835 9.289999961853027,6.28000020980835 9.289999961853027,6.28000020980835z"></path></g></g></g></g></svg>'
                            })
                          }),
                          tag('div', {
                            class: 'move-indicator',
                            style: 'left: 0',
                            children: [
                              tag('div', { class: 'down' }),
                              tag('div', { class: 'up' })
                            ]
                          }),
                          tag('div', {
                            class: 'popup',
                            style: 'left: 0',
                            children: [
                              tag('div', {
                                class: 'preview', children: [
                                  tag('img', { class: 'preview-image' }),
                                  tag('div', { class: 'preview-time' })
                                ]
                              }),
                            ]
                          }),
                        ]
                      }),
                    ]
                  }),
                  tag('div', {
                    class: 'bpx-player-control-bottom',
                    children: [
                      tag('div', {
                        class: 'bpx-player-control-bottom-left',
                        children: [
                          /**
                           * 上一个
                           */
                           /*
                          tag('div', {
                            class: 'previous control-btn',
                            attrs: { 'aria-label': '上一个' },
                            children: tag('div', {
                              class: 'icon',
                              style: 'transform: rotate(180deg);',
                              children: [
                                tag('svg', {
                                  attrs: { viewBox: '0 0 22 22' },
                                  innerHTML: '<path d="M16 5a1 1 0 0 0-1 1v4.615a1.431 1.431 0 0 0-.615-.829L7.21 5.23A1.439 1.439 0 0 0 5 6.445v9.11a1.44 1.44 0 0 0 2.21 1.215l7.175-4.555a1.436 1.436 0 0 0 .616-.828V16a1 1 0 0 0 2 0V6C17 5.448 16.552 5 16 5z"></path>'
                                }),
                              ]
                            })
                          }, (t) => t.addEventListener('click', previousVideo)),
                          */
                          /**
                           * 播放/暂停
                           */
                          tag('div', {
                            class: 'play control-btn',
                            attrs: { 'aria-label': '播放/暂停' },
                            children: tag('div', {
                              class: 'icon', children: [
                                tag('svg', {
                                  attrs: { viewBox: '0 0 28 28' },
                                  innerHTML: '<defs><clipPath id="__lottie_element_873"><rect width="28" height="28" x="0" y="0"></rect></clipPath></defs><g clip-path="url(#__lottie_element_873)"><g style="display: block;" transform="matrix(1,0,0,1,14,14)" opacity="1"><g opacity="1" transform="matrix(1,0,0,1,0,0)"><path fill-opacity="1" d=" M-5.484000205993652,-10 C-7.953000068664551,-10 -8,-7.984000205993652 -8,-7.984000205993652 C-8,-7.984000205993652 -8.008000373840332,7.984000205993652 -8.008000373840332,7.984000205993652 C-8.008000373840332,7.984000205993652 -7.984000205993652,9.991999626159668 -5.5,9.991999626159668 C-3.0160000324249268,9.991999626159668 -3.003999948501587,7.995999813079834 -3.003999948501587,7.995999813079834 C-3.003999948501587,7.995999813079834 -2.9839999675750732,-8 -2.9839999675750732,-8 C-2.9839999675750732,-8 -3.015000104904175,-10 -5.484000205993652,-10z"></path><path stroke-linecap="butt" stroke-linejoin="miter" fill-opacity="0" stroke-miterlimit="4" stroke="rgb(255,255,255)" stroke-opacity="1" stroke-width="0" d=" M-5.484000205993652,-10 C-7.953000068664551,-10 -8,-7.984000205993652 -8,-7.984000205993652 C-8,-7.984000205993652 -8.008000373840332,7.984000205993652 -8.008000373840332,7.984000205993652 C-8.008000373840332,7.984000205993652 -7.984000205993652,9.991999626159668 -5.5,9.991999626159668 C-3.0160000324249268,9.991999626159668 -3.003999948501587,7.995999813079834 -3.003999948501587,7.995999813079834 C-3.003999948501587,7.995999813079834 -2.9839999675750732,-8 -2.9839999675750732,-8 C-2.9839999675750732,-8 -3.015000104904175,-10 -5.484000205993652,-10z"></path></g></g><g style="display: block;" transform="matrix(1,0,0,1,24.812000274658203,14)" opacity="1"><g opacity="1" transform="matrix(1,0,0,1,0,0)"><path fill-opacity="1" d=" M-5.484000205993652,-10 C-7.953000068664551,-10 -8,-7.984000205993652 -8,-7.984000205993652 C-8,-7.984000205993652 -8.008000373840332,7.984000205993652 -8.008000373840332,7.984000205993652 C-8.008000373840332,7.984000205993652 -7.984000205993652,9.991999626159668 -5.5,9.991999626159668 C-3.0160000324249268,9.991999626159668 -3.003999948501587,7.995999813079834 -3.003999948501587,7.995999813079834 C-3.003999948501587,7.995999813079834 -2.9839999675750732,-8 -2.9839999675750732,-8 C-2.9839999675750732,-8 -3.015000104904175,-10 -5.484000205993652,-10z"></path><path stroke-linecap="butt" stroke-linejoin="miter" fill-opacity="0" stroke-miterlimit="4" stroke="rgb(255,255,255)" stroke-opacity="1" stroke-width="0" d=" M-5.484000205993652,-10 C-7.953000068664551,-10 -8,-7.984000205993652 -8,-7.984000205993652 C-8,-7.984000205993652 -8.008000373840332,7.984000205993652 -8.008000373840332,7.984000205993652 C-8.008000373840332,7.984000205993652 -7.984000205993652,9.991999626159668 -5.5,9.991999626159668 C-3.0160000324249268,9.991999626159668 -3.003999948501587,7.995999813079834 -3.003999948501587,7.995999813079834 C-3.003999948501587,7.995999813079834 -2.9839999675750732,-8 -2.9839999675750732,-8 C-2.9839999675750732,-8 -3.015000104904175,-10 -5.484000205993652,-10z"></path></g></g><g transform="matrix(1,0,0,1,6.69746208190918,14)" opacity="0.0008731750582263942" style="display: none;"><g opacity="1" transform="matrix(1,0,0,1,0,0)"><path fill-opacity="1" d="M0 0"></path><path stroke-linecap="butt" stroke-linejoin="miter" fill-opacity="0" stroke-miterlimit="4" stroke="rgb(255,255,255)" stroke-opacity="1" stroke-width="0" d="M0 0"></path></g><g opacity="1" transform="matrix(1,0,0,1,0,0)"><path fill-opacity="1" d=" M-7.031000137329102,-10.875 C-7.031000137329102,-10.875 -8.32800006866455,-11.25 -9.42199993133545,-10.468999862670898 C-10.109999656677246,-9.906999588012695 -10,-7.992000102996826 -10,-7.992000102996826 C-10,-7.992000102996826 -10,8.015999794006348 -10,8.015999794006348 C-10,8.015999794006348 -10.125,10.241999626159668 -9,10.991999626159668 C-7.875,11.741999626159668 -5,10.031000137329102 -5,10.031000137329102 C-5,10.031000137329102 7.968999862670898,1.875 7.968999862670898,1.875 C7.968999862670898,1.875 9,1.062000036239624 9,0 C9,-1.062000036239624 7.968999862670898,-1.937999963760376 7.968999862670898,-1.937999963760376 C7.968999862670898,-1.937999963760376 -7.031000137329102,-10.875 -7.031000137329102,-10.875z"></path><path stroke-linecap="butt" stroke-linejoin="miter" fill-opacity="0" stroke-miterlimit="4" stroke="rgb(255,255,255)" stroke-opacity="1" stroke-width="0" d=" M-7.031000137329102,-10.875 C-7.031000137329102,-10.875 -8.32800006866455,-11.25 -9.42199993133545,-10.468999862670898 C-10.109999656677246,-9.906999588012695 -10,-7.992000102996826 -10,-7.992000102996826 C-10,-7.992000102996826 -10,8.015999794006348 -10,8.015999794006348 C-10,8.015999794006348 -10.125,10.241999626159668 -9,10.991999626159668 C-7.875,11.741999626159668 -5,10.031000137329102 -5,10.031000137329102 C-5,10.031000137329102 7.968999862670898,1.875 7.968999862670898,1.875 C7.968999862670898,1.875 9,1.062000036239624 9,0 C9,-1.062000036239624 7.968999862670898,-1.937999963760376 7.968999862670898,-1.937999963760376 C7.968999862670898,-1.937999963760376 -7.031000137329102,-10.875 -7.031000137329102,-10.875z"></path></g></g></g>'
                                }),
                                tag('svg', {
                                  attrs: { viewBox: '0 0 28 28' },
                                  innerHTML: '<defs><clipPath id="__lottie_element_818"><rect width="28" height="28" x="0" y="0"></rect></clipPath></defs><g clip-path="url(#__lottie_element_818)"><g transform="matrix(0.22383984923362732,0,0,0.22383984923362732,20.641138076782227,14.097020149230957)" opacity="0.002394794788598773" style="display: none;"><g opacity="1" transform="matrix(1,0,0,1,0,0)"><path fill-opacity="1" d=" M-5.484000205993652,-10 C-7.953000068664551,-10 -8,-7.984000205993652 -8,-7.984000205993652 C-8,-7.984000205993652 -8.008000373840332,7.984000205993652 -8.008000373840332,7.984000205993652 C-8.008000373840332,7.984000205993652 -7.984000205993652,9.991999626159668 -5.5,9.991999626159668 C-3.0160000324249268,9.991999626159668 -3.003999948501587,7.995999813079834 -3.003999948501587,7.995999813079834 C-3.003999948501587,7.995999813079834 -2.9839999675750732,-8 -2.9839999675750732,-8 C-2.9839999675750732,-8 -3.015000104904175,-10 -5.484000205993652,-10z"></path><path stroke-linecap="butt" stroke-linejoin="miter" fill-opacity="0" stroke-miterlimit="4" stroke="rgb(255,255,255)" stroke-opacity="1" stroke-width="0" d=" M-5.484000205993652,-10 C-7.953000068664551,-10 -8,-7.984000205993652 -8,-7.984000205993652 C-8,-7.984000205993652 -8.008000373840332,7.984000205993652 -8.008000373840332,7.984000205993652 C-8.008000373840332,7.984000205993652 -7.984000205993652,9.991999626159668 -5.5,9.991999626159668 C-3.0160000324249268,9.991999626159668 -3.003999948501587,7.995999813079834 -3.003999948501587,7.995999813079834 C-3.003999948501587,7.995999813079834 -2.9839999675750732,-8 -2.9839999675750732,-8 C-2.9839999675750732,-8 -3.015000104904175,-10 -5.484000205993652,-10z"></path></g></g><g transform="matrix(0.6509166955947876,0,0,0.6509166955947876,22.417274475097656,14)" opacity="0.0024594099834516214" style="display: none;"><g opacity="1" transform="matrix(1,0,0,1,0,0)"><path fill-opacity="1" d=" M-5.484000205993652,-10 C-7.953000068664551,-10 -8,-7.984000205993652 -8,-7.984000205993652 C-8,-7.984000205993652 -8.008000373840332,7.984000205993652 -8.008000373840332,7.984000205993652 C-8.008000373840332,7.984000205993652 -7.984000205993652,9.991999626159668 -5.5,9.991999626159668 C-3.0160000324249268,9.991999626159668 -3.003999948501587,7.995999813079834 -3.003999948501587,7.995999813079834 C-3.003999948501587,7.995999813079834 -2.9839999675750732,-8 -2.9839999675750732,-8 C-2.9839999675750732,-8 -3.015000104904175,-10 -5.484000205993652,-10z"></path><path stroke-linecap="butt" stroke-linejoin="miter" fill-opacity="0" stroke-miterlimit="4" stroke="rgb(255,255,255)" stroke-opacity="1" stroke-width="0" d=" M-5.484000205993652,-10 C-7.953000068664551,-10 -8,-7.984000205993652 -8,-7.984000205993652 C-8,-7.984000205993652 -8.008000373840332,7.984000205993652 -8.008000373840332,7.984000205993652 C-8.008000373840332,7.984000205993652 -7.984000205993652,9.991999626159668 -5.5,9.991999626159668 C-3.0160000324249268,9.991999626159668 -3.003999948501587,7.995999813079834 -3.003999948501587,7.995999813079834 C-3.003999948501587,7.995999813079834 -2.9839999675750732,-8 -2.9839999675750732,-8 C-2.9839999675750732,-8 -3.015000104904175,-10 -5.484000205993652,-10z"></path></g></g><g style="display: block;" transform="matrix(1,0,0,1,14,14)" opacity="1"><g opacity="1" transform="matrix(1,0,0,1,0,0)"><path fill-opacity="1" d="M0 0"></path><path stroke-linecap="butt" stroke-linejoin="miter" fill-opacity="0" stroke-miterlimit="4" stroke="rgb(255,255,255)" stroke-opacity="1" stroke-width="0" d="M0 0"></path></g><g opacity="1" transform="matrix(1,0,0,1,0,0)"><path fill-opacity="1" d=" M-7.031000137329102,-10.875 C-7.031000137329102,-10.875 -8.32800006866455,-11.25 -9.42199993133545,-10.468999862670898 C-10.109999656677246,-9.906999588012695 -10,-7.992000102996826 -10,-7.992000102996826 C-10,-7.992000102996826 -10,8.015999794006348 -10,8.015999794006348 C-10,8.015999794006348 -10.125,10.241999626159668 -9,10.991999626159668 C-7.875,11.741999626159668 -5,10.031000137329102 -5,10.031000137329102 C-5,10.031000137329102 7.968999862670898,1.875 7.968999862670898,1.875 C7.968999862670898,1.875 9,1.062000036239624 9,0 C9,-1.062000036239624 7.968999862670898,-1.937999963760376 7.968999862670898,-1.937999963760376 C7.968999862670898,-1.937999963760376 -7.031000137329102,-10.875 -7.031000137329102,-10.875z"></path><path stroke-linecap="butt" stroke-linejoin="miter" fill-opacity="0" stroke-miterlimit="4" stroke="rgb(255,255,255)" stroke-opacity="1" stroke-width="0" d=" M-7.031000137329102,-10.875 C-7.031000137329102,-10.875 -8.32800006866455,-11.25 -9.42199993133545,-10.468999862670898 C-10.109999656677246,-9.906999588012695 -10,-7.992000102996826 -10,-7.992000102996826 C-10,-7.992000102996826 -10,8.015999794006348 -10,8.015999794006348 C-10,8.015999794006348 -10.125,10.241999626159668 -9,10.991999626159668 C-7.875,11.741999626159668 -5,10.031000137329102 -5,10.031000137329102 C-5,10.031000137329102 7.968999862670898,1.875 7.968999862670898,1.875 C7.968999862670898,1.875 9,1.062000036239624 9,0 C9,-1.062000036239624 7.968999862670898,-1.937999963760376 7.968999862670898,-1.937999963760376 C7.968999862670898,-1.937999963760376 -7.031000137329102,-10.875 -7.031000137329102,-10.875z"></path></g></g></g>'
                                }),
                              ]
                            })
                          }),
                          /**
                           * 下一个
                           */
                           /*
                          tag('div', {
                            class: 'next control-btn',
                            attrs: { 'aria-label': '下一个' },
                            children: tag('div', {
                              class: 'icon', children: tag('svg', {
                                attrs: { viewBox: '0 0 22 22' },
                                innerHTML: '<path d="M16 5a1 1 0 0 0-1 1v4.615a1.431 1.431 0 0 0-.615-.829L7.21 5.23A1.439 1.439 0 0 0 5 6.445v9.11a1.44 1.44 0 0 0 2.21 1.215l7.175-4.555a1.436 1.436 0 0 0 .616-.828V16a1 1 0 0 0 2 0V6C17 5.448 16.552 5 16 5z"></path>'
                              })
                            })
                          }, (t) => t.addEventListener('click', nextVideo)),
                          */
                          /**
                           * 时间显示
                           */
                          tag('div', {
                            class: 'time control-btn',
                            children: [
                              tag('input', {
                                class: 'seek', style: 'display: none',
                              }),
                              tag('div', {
                                class: 'label', children: [
                                  tag('span', { class: 'current', innerHTML: '00:00' }),
                                  tag('span', { class: 'divide', innerHTML: '/' }),
                                  tag('span', { class: 'duration', innerHTML: '00:00' }),
                                ]
                              })
                            ]
                          }),
                        ]
                      }),
                      tag('div', {
                        class: 'bpx-player-control-bottom-right',
                        children: [
                          /**
                           * 倍速
                           */
                          tag('div', {
                            class: 'playbackrate control-btn',
                            attrs: { 'aria-label': '倍速' },
                            children: [
                              tag('div', { class: 'text', innerText: '倍速' }),
                              tag('ul', {
                                class: 'playbackrate-menu',
                                children: [2, 1.5, 1.25, 1, 0.75, 0.5].map(i => tag('li', {
                                  class: 'item' + (i === 1 ? ' active' : ''),
                                  attrs: { 'data-value': i },
                                  innerText: i + 'x',
                                }))
                              }),
                            ]
                          }, (t) => {
                            let idx;
                            t.addEventListener('mouseenter', () => {
                              clearTimeout(idx);
                              t.classList.add('hover');
                            })
                            t.addEventListener('mouseleave', () => {
                              idx = setTimeout(() => { t.classList.remove('hover') }, 200);
                            })
                            t.addEventListener('click', (e) => {
                              if (e.target.closest('.playbackrate-menu .item')) {
                                const x = e.target.getAttribute('data-value');
                                if (x < 0) return;
                                this.playbackRate = parseFloat(x);
                                this.currentRate = parseFloat(x);
                                for (const i of t.querySelectorAll('.playbackrate-menu .item')) {
                                  i.classList.remove('active');
                                }
                                e.target.classList.add('active');
                                t.querySelector('.text').innerText = (x === '1' ? '倍速' : x + 'x');
                              }
                            });
                          }),

                          /**
                           * 音量
                           */
                          tag('div', {
                            class: 'volume control-btn',
                            attrs: { 'aria-label': '音量' },
                            children: [
                              tag('div', {
                                class: 'icon volume-icon',
                                children: tag('svg', {
                                  attrs: { viewBox: '0 0 88 88' },
                                  innerHTML: '<g clip-path="url(#__lottie_element_745)"><g clip-path="url(#__lottie_element_747)" transform="matrix(1,0,0,1,0,0)" opacity="1" style="display: block;"><g transform="matrix(1,0,0,1,28,44)" opacity="1" style="display: block;"><g opacity="1" transform="matrix(1,0,0,1,0,0)"><path fill="rgb(255,255,255)" fill-opacity="1" d=" M15.5600004196167,-25.089000701904297 C15.850000381469727,-24.729000091552734 16,-24.288999557495117 16,-23.839000701904297 C16,-23.839000701904297 16,23.840999603271484 16,23.840999603271484 C16,24.94099998474121 15.100000381469727,25.840999603271484 14,25.840999603271484 C13.550000190734863,25.840999603271484 13.109999656677246,25.680999755859375 12.75,25.400999069213867 C12.75,25.400999069213867 -4,12.00100040435791 -4,12.00100040435791 C-4,12.00100040435791 -8,12.00100040435791 -8,12.00100040435791 C-12.420000076293945,12.00100040435791 -16,8.420999526977539 -16,4.000999927520752 C-16,4.000999927520752 -16,-3.999000072479248 -16,-3.999000072479248 C-16,-8.418999671936035 -12.420000076293945,-11.99899959564209 -8,-11.99899959564209 C-8,-11.99899959564209 -4,-11.99899959564209 -4,-11.99899959564209 C-4,-11.99899959564209 12.75,-25.39900016784668 12.75,-25.39900016784668 C13.609999656677246,-26.089000701904297 14.869999885559082,-25.948999404907227 15.5600004196167,-25.089000701904297z"></path></g></g><g style="display: none;" transform="matrix(1.005157470703125,0,0,1.005157470703125,56.00225067138672,44.0004997253418)" opacity="0.194217437118555"><g opacity="1" transform="matrix(1,0,0,1,0,0)"><path fill="rgb(255,255,255)" fill-opacity="1" d=" M-4,-13.859000205993652 C0.7799999713897705,-11.08899974822998 4,-5.919000148773193 4,0.0010000000474974513 C4,5.921000003814697 0.7799999713897705,11.090999603271484 -4,13.861000061035156 C-4,13.861000061035156 -4,-13.859000205993652 -4,-13.859000205993652z"></path></g></g><g style="display: none;" transform="matrix(1.0126574039459229,0,0,1.0126574039459229,64.37825012207031,44.0057487487793)" opacity="0.002830605068398171"><g opacity="1" transform="matrix(1,0,0,1,0,0)"><path fill="rgb(255,255,255)" fill-opacity="1" d=" M-6.236000061035156,-28.895999908447266 C4.803999900817871,-23.615999221801758 11.984000205993652,-12.456000328063965 11.984000205993652,-0.006000000052154064 C11.984000205993652,12.454000473022461 4.794000148773193,23.624000549316406 -6.265999794006348,28.893999099731445 C-8.255999565124512,29.8439998626709 -10.645999908447266,29.003999710083008 -11.595999717712402,27.003999710083008 C-12.545999526977539,25.013999938964844 -11.696000099182129,22.624000549316406 -9.706000328063965,21.673999786376953 C-1.406000018119812,17.724000930786133 3.9839999675750732,9.343999862670898 3.9839999675750732,-0.006000000052154064 C3.9839999675750732,-9.345999717712402 -1.3960000276565552,-17.715999603271484 -9.675999641418457,-21.676000595092773 C-11.675999641418457,-22.625999450683594 -12.515999794006348,-25.016000747680664 -11.565999984741211,-27.006000518798828 C-10.616000175476074,-29.006000518798828 -8.22599983215332,-29.84600067138672 -6.236000061035156,-28.895999908447266z"></path></g></g><g style="display: none;" transform="matrix(1.0002121925354004,0,0,1.0002121925354004,56.00299072265625,44)" opacity="1"><g opacity="1" transform="matrix(1,0,0,1,0,0)"><path fill="rgb(255,255,255)" fill-opacity="1" d=" M-4,-13.859000205993652 C0.7799999713897705,-11.08899974822998 4,-5.919000148773193 4,0.0010000000474974513 C4,5.921000003814697 0.7799999713897705,11.090999603271484 -4,13.861000061035156 C-4,13.861000061035156 -4,-13.859000205993652 -4,-13.859000205993652z"></path></g></g><g style="display: none;" transform="matrix(1.0002012252807617,0,0,1.0002012252807617,64.00399780273438,44.00699996948242)" opacity="1"><g opacity="1" transform="matrix(1,0,0,1,0,0)"><path fill="rgb(255,255,255)" fill-opacity="1" d=" M-6.236000061035156,-28.895999908447266 C4.803999900817871,-23.615999221801758 11.984000205993652,-12.456000328063965 11.984000205993652,-0.006000000052154064 C11.984000205993652,12.454000473022461 4.794000148773193,23.624000549316406 -6.265999794006348,28.893999099731445 C-8.255999565124512,29.8439998626709 -10.645999908447266,29.003999710083008 -11.595999717712402,27.003999710083008 C-12.545999526977539,25.013999938964844 -11.696000099182129,22.624000549316406 -9.706000328063965,21.673999786376953 C-1.406000018119812,17.724000930786133 3.9839999675750732,9.343999862670898 3.9839999675750732,-0.006000000052154064 C3.9839999675750732,-9.345999717712402 -1.3960000276565552,-17.715999603271484 -9.675999641418457,-21.676000595092773 C-11.675999641418457,-22.625999450683594 -12.515999794006348,-25.016000747680664 -11.565999984741211,-27.006000518798828 C-10.616000175476074,-29.006000518798828 -8.22599983215332,-29.84600067138672 -6.236000061035156,-28.895999908447266z"></path></g></g><g transform="matrix(1,0,0,1,56,44)" opacity="1" style="display: block;"><g opacity="1" transform="matrix(1,0,0,1,0,0)"><path fill="rgb(255,255,255)" fill-opacity="1" d=" M-4,-13.859000205993652 C0.7799999713897705,-11.08899974822998 4,-5.919000148773193 4,0.0010000000474974513 C4,5.921000003814697 0.7799999713897705,11.090999603271484 -4,13.861000061035156 C-4,13.861000061035156 -4,-13.859000205993652 -4,-13.859000205993652z"></path></g></g><g transform="matrix(1,0,0,1,64.01399993896484,44.00699996948242)" opacity="1" style="display: block;"><g opacity="1" transform="matrix(1,0,0,1,0,0)"><path fill="rgb(255,255,255)" fill-opacity="1" d=" M-6.236000061035156,-28.895999908447266 C4.803999900817871,-23.615999221801758 11.984000205993652,-12.456000328063965 11.984000205993652,-0.006000000052154064 C11.984000205993652,12.454000473022461 4.794000148773193,23.624000549316406 -6.265999794006348,28.893999099731445 C-8.255999565124512,29.8439998626709 -10.645999908447266,29.003999710083008 -11.595999717712402,27.003999710083008 C-12.545999526977539,25.013999938964844 -11.696000099182129,22.624000549316406 -9.706000328063965,21.673999786376953 C-1.406000018119812,17.724000930786133 3.9839999675750732,9.343999862670898 3.9839999675750732,-0.006000000052154064 C3.9839999675750732,-9.345999717712402 -1.3960000276565552,-17.715999603271484 -9.675999641418457,-21.676000595092773 C-11.675999641418457,-22.625999450683594 -12.515999794006348,-25.016000747680664 -11.565999984741211,-27.006000518798828 C-10.616000175476074,-29.006000518798828 -8.22599983215332,-29.84600067138672 -6.236000061035156,-28.895999908447266z"></path></g></g></g></g>'
                                })
                              }),
                              tag('div', {
                                class: 'icon muted-icon',
                                style: 'display: none',
                                children: tag('svg', {
                                  attrs: { viewBox: '0 0 88 88' },
                                  innerHTML: '<g clip-path="url(#__lottie_element_773)"><g mask="url(#__lottie_element_777)" style="display: block;"><g transform="matrix(1,0,0,1,44,44)" opacity="1"><g opacity="1" transform="matrix(1,0,0,1,0,0)"><path fill="rgb(255,255,255)" fill-opacity="1" d=" M-0.4399999976158142,-25.09600067138672 C-0.15000000596046448,-24.736000061035156 0,-24.29599952697754 0,-23.84600067138672 C0,-23.84600067138672 0,23.833999633789062 0,23.833999633789062 C0,24.93400001525879 -0.8999999761581421,25.833999633789062 -2,25.833999633789062 C-2.450000047683716,25.833999633789062 -2.890000104904175,25.673999786376953 -3.25,25.393999099731445 C-3.25,25.393999099731445 -20,11.994000434875488 -20,11.994000434875488 C-20,11.994000434875488 -24,11.994000434875488 -24,11.994000434875488 C-28.420000076293945,11.994000434875488 -32,8.413999557495117 -32,3.99399995803833 C-32,3.99399995803833 -32,-4.00600004196167 -32,-4.00600004196167 C-32,-8.425999641418457 -28.420000076293945,-12.005999565124512 -24,-12.005999565124512 C-24,-12.005999565124512 -20,-12.005999565124512 -20,-12.005999565124512 C-20,-12.005999565124512 -3.25,-25.4060001373291 -3.25,-25.4060001373291 C-2.390000104904175,-26.09600067138672 -1.1299999952316284,-25.95599937438965 -0.4399999976158142,-25.09600067138672z M13.777999877929688,-28.895999908447266 C24.81800079345703,-23.615999221801758 31.99799919128418,-12.456000328063965 31.99799919128418,-0.006000000052154064 C31.99799919128418,12.454000473022461 24.808000564575195,23.624000549316406 13.748000144958496,28.893999099731445 C11.758000373840332,29.8439998626709 9.368000030517578,29.003999710083008 8.418000221252441,27.003999710083008 C7.4679999351501465,25.013999938964844 8.317999839782715,22.624000549316406 10.307999610900879,21.673999786376953 C18.607999801635742,17.724000930786133 23.99799919128418,9.343999862670898 23.99799919128418,-0.006000000052154064 C23.99799919128418,-9.345999717712402 18.618000030517578,-17.715999603271484 10.338000297546387,-21.676000595092773 C8.338000297546387,-22.625999450683594 7.498000144958496,-25.016000747680664 8.447999954223633,-27.006000518798828 C9.39799976348877,-29.006000518798828 11.788000106811523,-29.84600067138672 13.777999877929688,-28.895999908447266z M8,-13.866000175476074 C12.779999732971191,-11.095999717712402 16,-5.926000118255615 16,-0.006000000052154064 C16,5.914000034332275 12.779999732971191,11.083999633789062 8,13.854000091552734 C8,13.854000091552734 8,-13.866000175476074 8,-13.866000175476074z"></path></g></g></g><g transform="matrix(1,0,0,1,41.172000885009766,46.827999114990234)" opacity="1" style="display: block;"><g opacity="1" transform="matrix(1,0,0,1,-0.5,-0.5)"><path fill="rgb(255,255,255)" fill-opacity="1" d=" M-33.94157409667969,-28.281574249267578 C-35.50258255004883,-29.84258270263672 -35.50258255004883,-32.377418518066406 -33.94157409667969,-33.93842697143555 C-33.94157409667969,-33.93842697143555 -33.93842697143555,-33.94157409667969 -33.93842697143555,-33.94157409667969 C-32.377418518066406,-35.50258255004883 -29.84258270263672,-35.50258255004883 -28.281574249267578,-33.94157409667969 C-28.281574249267578,-33.94157409667969 33.94157409667969,28.281574249267578 33.94157409667969,28.281574249267578 C35.50258255004883,29.84258270263672 35.50258255004883,32.377418518066406 33.94157409667969,33.93842697143555 C33.94157409667969,33.93842697143555 33.93842697143555,33.94157409667969 33.93842697143555,33.94157409667969 C32.377418518066406,35.50258255004883 29.84258270263672,35.50258255004883 28.281574249267578,33.94157409667969 C28.281574249267578,33.94157409667969 -33.94157409667969,-28.281574249267578 -33.94157409667969,-28.281574249267578z"></path></g></g></g>'
                                })
                              }),
                              tag('div', {
                                class: 'volume-box',
                                children: [
                                  tag('div', {
                                    class: 'volume-number',
                                    innerText: '100',
                                  }),
                                  tag('div', {
                                    class: 'volume-slider',
                                    children: tag('div', {
                                      class: 'track', children: [
                                        tag('div', { class: 'bar-wrap', children: tag('div', { class: 'bar' }) }),
                                        tag('div', { class: 'thumb', children: tag('div', { class: 'thumb-dot' }) }),
                                      ]
                                    })
                                  })
                                ]
                              })
                            ]
                          }, (t) => {
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
                            t.querySelector('.volume-box .volume-slider').addEventListener('mousedown', () => {
                              slider_mousedown = true;
                              t.classList.add('hover');
                              clearTimeout(idx);
                            });
                            document.addEventListener('mouseup', () => {
                              slider_mousedown = false;
                              t.classList.remove('hover');
                            });
                            document.addEventListener('mousemove', e => {
                              if (slider_mousedown) clearTimeout(idx);

                              if (slider_mousedown) {
                                const x = 1 - (e.clientY - slider.getBoundingClientRect().top) / slider.clientHeight;
                                sliderUpdateVolume(x);
                                if (x > 0 && x <= 1) {
                                  this.config.media.volume = x;
                                  this.config.media.nonzeroVol = x;
                                } else if (x <= 0) {
                                  this.config.media.volume = 0;
                                }
                                this.volume = this.config.media.volume;
                                localStorage.setItem('bpx_player_profile', JSON.stringify(this.config));
                              }
                            });
                          }),

                          /**
                           * 设置
                           */
                          tag('div', {
                            class: 'settings control-btn',
                            attrs: { 'aria-label': '设置' },
                            children: tag('div', {
                              class: 'icon', children: tag('svg', {
                                attrs: { viewBox: '0 0 88 88' },
                                innerHTML: '<g clip-path="url(#__lottie_element_100)"><g transform="matrix(1,0,0,1,44,43.875)" opacity="1" style="display: block;"><g opacity="1" transform="matrix(1,0,0,1,0,0)"><path fill="rgb(255,255,255)" fill-opacity="1" d=" M0,8.125 C-4.420000076293945,8.125 -8,4.545000076293945 -8,0.125 C-8,-4.295000076293945 -4.420000076293945,-7.875 0,-7.875 C4.420000076293945,-7.875 8,-4.295000076293945 8,0.125 C8,4.545000076293945 4.420000076293945,8.125 0,8.125z M0,16.125 C8.84000015258789,16.125 16,8.96500015258789 16,0.125 C16,-8.71500015258789 8.84000015258789,-15.875 0,-15.875 C-8.84000015258789,-15.875 -16,-8.71500015258789 -16,0.125 C-16,8.96500015258789 -8.84000015258789,16.125 0,16.125z M4.539999961853027,27.51099967956543 C3.059999942779541,27.750999450683594 1.5499999523162842,27.871000289916992 0,27.871000289916992 C-1.5499999523162842,27.871000289916992 -3.059999942779541,27.750999450683594 -4.539999961853027,27.51099967956543 C-4.539999961853027,27.51099967956543 -8.699999809265137,32.56100082397461 -8.699999809265137,32.56100082397461 C-9.9399995803833,34.07099914550781 -12.100000381469727,34.46099853515625 -13.789999961853027,33.48099899291992 C-13.789999961853027,33.48099899291992 -21.780000686645508,28.871000289916992 -21.780000686645508,28.871000289916992 C-23.469999313354492,27.891000747680664 -24.209999084472656,25.83099937438965 -23.520000457763672,24.000999450683594 C-23.520000457763672,24.000999450683594 -21.290000915527344,18.06100082397461 -21.290000915527344,18.06100082397461 C-23.3799991607666,15.621000289916992 -25.049999237060547,12.810999870300293 -26.209999084472656,9.76099967956543 C-26.209999084472656,9.76099967956543 -32.65999984741211,8.680999755859375 -32.65999984741211,8.680999755859375 C-34.59000015258789,8.361000061035156 -36,6.690999984741211 -36,4.741000175476074 C-36,4.741000175476074 -36,-4.488999843597412 -36,-4.488999843597412 C-36,-6.439000129699707 -34.59000015258789,-8.109000205993652 -32.65999984741211,-8.428999900817871 C-32.65999984741211,-8.428999900817871 -26.399999618530273,-9.479000091552734 -26.399999618530273,-9.479000091552734 C-25.309999465942383,-12.559000015258789 -23.690000534057617,-15.388999938964844 -21.65999984741211,-17.868999481201172 C-21.65999984741211,-17.868999481201172 -23.959999084472656,-23.999000549316406 -23.959999084472656,-23.999000549316406 C-24.639999389648438,-25.839000701904297 -23.899999618530273,-27.888999938964844 -22.209999084472656,-28.868999481201172 C-22.209999084472656,-28.868999481201172 -14.220000267028809,-33.479000091552734 -14.220000267028809,-33.479000091552734 C-12.529999732971191,-34.45899963378906 -10.380000114440918,-34.069000244140625 -9.130000114440918,-32.558998107910156 C-9.130000114440918,-32.558998107910156 -5.099999904632568,-27.659000396728516 -5.099999904632568,-27.659000396728516 C-3.450000047683716,-27.9689998626709 -1.7400000095367432,-28.128999710083008 0,-28.128999710083008 C1.7400000095367432,-28.128999710083008 3.450000047683716,-27.9689998626709 5.099999904632568,-27.659000396728516 C5.099999904632568,-27.659000396728516 9.130000114440918,-32.558998107910156 9.130000114440918,-32.558998107910156 C10.380000114440918,-34.069000244140625 12.529999732971191,-34.45899963378906 14.220000267028809,-33.479000091552734 C14.220000267028809,-33.479000091552734 22.209999084472656,-28.868999481201172 22.209999084472656,-28.868999481201172 C23.899999618530273,-27.888999938964844 24.639999389648438,-25.839000701904297 23.959999084472656,-23.999000549316406 C23.959999084472656,-23.999000549316406 21.65999984741211,-17.868999481201172 21.65999984741211,-17.868999481201172 C23.690000534057617,-15.388999938964844 25.309999465942383,-12.559000015258789 26.399999618530273,-9.479000091552734 C26.399999618530273,-9.479000091552734 32.65999984741211,-8.428999900817871 32.65999984741211,-8.428999900817871 C34.59000015258789,-8.109000205993652 36,-6.439000129699707 36,-4.488999843597412 C36,-4.488999843597412 36,4.741000175476074 36,4.741000175476074 C36,6.690999984741211 34.59000015258789,8.361000061035156 32.65999984741211,8.680999755859375 C32.65999984741211,8.680999755859375 26.209999084472656,9.76099967956543 26.209999084472656,9.76099967956543 C25.049999237060547,12.810999870300293 23.3799991607666,15.621000289916992 21.290000915527344,18.06100082397461 C21.290000915527344,18.06100082397461 23.520000457763672,24.000999450683594 23.520000457763672,24.000999450683594 C24.209999084472656,25.83099937438965 23.469999313354492,27.891000747680664 21.780000686645508,28.871000289916992 C21.780000686645508,28.871000289916992 13.789999961853027,33.48099899291992 13.789999961853027,33.48099899291992 C12.100000381469727,34.46099853515625 9.9399995803833,34.07099914550781 8.699999809265137,32.56100082397461 C8.699999809265137,32.56100082397461 4.539999961853027,27.51099967956543 4.539999961853027,27.51099967956543z"></path></g></g></g>'
                              })
                            })
                          }, (t) => {
                            // t.addEventListener('click', );
                          }),

                          /**
                           * 全屏
                           */
                          tag('div', {
                            class: 'fullscreen control-btn',
                            attrs: { 'aria-label': '全屏' },
                            children: tag('div', {
                              class: 'icon', children: tag('svg', {
                                attrs: { viewBox: '0 0 88 88' },
                                innerHTML: '<g clip-path="url(#__lottie_element_148)"><g transform="matrix(1,0,0,1,44,74.22000122070312)" opacity="1" style="display: block;"><g opacity="1" transform="matrix(1,0,0,1,0,0)"><path fill="rgb(255,255,255)" fill-opacity="1" d=" M19.219999313354492,0.2199999988079071 C7.480000019073486,7.630000114440918 -7.480000019073486,7.630000114440918 -19.219999313354492,0.2199999988079071 C-19.219999313354492,0.2199999988079071 -16.219999313354492,-5.78000020980835 -16.219999313354492,-5.78000020980835 C-6.389999866485596,0.75 6.409999847412109,0.75 16.239999771118164,-5.78000020980835 C16.239999771118164,-5.78000020980835 19.219999313354492,0.2199999988079071 19.219999313354492,0.2199999988079071z"></path></g></g><g transform="matrix(1,0,0,1,68.58000183105469,27.895000457763672)" opacity="1" style="display: block;"><g opacity="1" transform="matrix(1,0,0,1,0,0)"><path fill="rgb(255,255,255)" fill-opacity="1" d=" M11.420000076293945,16.104999542236328 C11.420000076293945,16.104999542236328 4.78000020980835,16.104999542236328 4.78000020980835,16.104999542236328 C4.78000020980835,16.104999542236328 4.78000020980835,14.635000228881836 4.78000020980835,14.635000228881836 C4.25,4.054999828338623 -1.940000057220459,-5.425000190734863 -11.420000076293945,-10.164999961853027 C-11.420000076293945,-10.164999961853027 -8.479999542236328,-16.104999542236328 -8.479999542236328,-16.104999542236328 C3.7200000286102295,-10.005000114440918 11.420000076293945,2.4649999141693115 11.420000076293945,16.104999542236328 C11.420000076293945,16.104999542236328 11.420000076293945,16.104999542236328 11.420000076293945,16.104999542236328z"></path></g></g><g transform="matrix(1,0,0,1,19.450000762939453,27.895000457763672)" opacity="1" style="display: block;"><g opacity="1" transform="matrix(1,0,0,1,0,0)"><path fill="rgb(255,255,255)" fill-opacity="1" d=" M-4.809999942779541,16.104999542236328 C-4.809999942779541,16.104999542236328 -11.449999809265137,16.104999542236328 -11.449999809265137,16.104999542236328 C-11.449999809265137,2.4649999141693115 -3.75,-10.005000114440918 8.449999809265137,-16.104999542236328 C8.449999809265137,-16.104999542236328 11.449999809265137,-10.164999961853027 11.449999809265137,-10.164999961853027 C1.4900000095367432,-5.204999923706055 -4.809999942779541,4.974999904632568 -4.809999942779541,16.104999542236328 C-4.809999942779541,16.104999542236328 -4.809999942779541,16.104999542236328 -4.809999942779541,16.104999542236328z"></path></g></g><g transform="matrix(1,0,0,1,44.0099983215332,65.96499633789062)" opacity="1" style="display: block;"><g opacity="1" transform="matrix(1,0,0,1,0,0)"><path fill="rgb(255,255,255)" fill-opacity="1" d=" M-0.009999999776482582,5.34499979019165 C-5.46999979019165,5.355000019073486 -10.800000190734863,3.7149999141693115 -15.319999694824219,0.6549999713897705 C-15.319999694824219,0.6549999713897705 -12.319999694824219,-5.34499979019165 -12.319999694824219,-5.34499979019165 C-5,0.08500000089406967 5,0.08500000089406967 12.319999694824219,-5.34499979019165 C12.319999694824219,-5.34499979019165 15.319999694824219,0.6549999713897705 15.319999694824219,0.6549999713897705 C10.800000190734863,3.7249999046325684 5.460000038146973,5.355000019073486 -0.009999999776482582,5.34499979019165z"></path></g></g><g transform="matrix(1,0,0,1,62.275001525878906,31.780000686645508)" opacity="1" style="display: block;"><g opacity="1" transform="matrix(1,0,0,1,0,0)"><path fill="rgb(255,255,255)" fill-opacity="1" d=" M9.015000343322754,10.850000381469727 C9.015000343322754,10.850000381469727 9.015000343322754,12.220000267028809 9.015000343322754,12.220000267028809 C9.015000343322754,12.220000267028809 2.434999942779541,12.220000267028809 2.434999942779541,12.220000267028809 C2.434999942779541,12.220000267028809 2.434999942779541,11.220000267028809 2.434999942779541,11.220000267028809 C2.075000047683716,3.740000009536743 -2.305000066757202,-2.9700000286102295 -9.015000343322754,-6.309999942779541 C-9.015000343322754,-6.309999942779541 -6.014999866485596,-12.220000267028809 -6.014999866485596,-12.220000267028809 C-6.014999866485596,-12.220000267028809 -6.014999866485596,-12.220000267028809 -6.014999866485596,-12.220000267028809 C2.7850000858306885,-7.800000190734863 8.524999618530273,1.0099999904632568 9.015000343322754,10.850000381469727 C9.015000343322754,10.850000381469727 9.015000343322754,10.850000381469727 9.015000343322754,10.850000381469727z"></path></g></g><g transform="matrix(1,0,0,1,25.729999542236328,31.780000686645508)" opacity="1" style="display: block;"><g opacity="1" transform="matrix(1,0,0,1,0,0)"><path fill="rgb(255,255,255)" fill-opacity="1" d=" M-2.440000057220459,12.220000267028809 C-2.440000057220459,12.220000267028809 -9.050000190734863,12.220000267028809 -9.050000190734863,12.220000267028809 C-9.050000190734863,1.8700000047683716 -3.2100000381469727,-7.590000152587891 6.050000190734863,-12.220000267028809 C6.050000190734863,-12.220000267028809 9.050000190734863,-6.309999942779541 9.050000190734863,-6.309999942779541 C2.0199999809265137,-2.809999942779541 -2.430000066757202,4.360000133514404 -2.440000057220459,12.220000267028809 C-2.440000057220459,12.220000267028809 -2.440000057220459,12.220000267028809 -2.440000057220459,12.220000267028809z"></path></g></g><g transform="matrix(1,0,0,1,44,57.654998779296875)" opacity="1" style="display: block;"><g opacity="1" transform="matrix(1,0,0,1,0,0)"><path fill="rgb(255,255,255)" fill-opacity="1" d=" M0,4.974999904632568 C-4.110000133514404,4.994999885559082 -8.119999885559082,3.6449999809265137 -11.380000114440918,1.1349999904632568 C-11.380000114440918,1.1349999904632568 -8.319999694824219,-4.974999904632568 -8.319999694824219,-4.974999904632568 C-3.6700000762939453,-0.5049999952316284 3.6700000762939453,-0.5049999952316284 8.319999694824219,-4.974999904632568 C8.319999694824219,-4.974999904632568 11.380000114440918,1.1349999904632568 11.380000114440918,1.1349999904632568 C8.109999656677246,3.634999990463257 4.110000133514404,4.985000133514404 0,4.974999904632568 C0,4.974999904632568 0,4.974999904632568 0,4.974999904632568z"></path></g></g><g transform="matrix(1,0,0,1,55.9900016784668,35.665000915527344)" opacity="1" style="display: block;"><g opacity="1" transform="matrix(1,0,0,1,0,0)"><path fill="rgb(255,255,255)" fill-opacity="1" d=" M6.619999885559082,7.40500020980835 C6.619999885559082,7.40500020980835 6.619999885559082,8.335000038146973 6.619999885559082,8.335000038146973 C6.619999885559082,8.335000038146973 0.009999999776482582,8.335000038146973 0.009999999776482582,8.335000038146973 C0.009999999776482582,3.7850000858306885 -2.549999952316284,-0.375 -6.619999885559082,-2.4049999713897705 C-6.619999885559082,-2.4049999713897705 -3.619999885559082,-8.335000038146973 -3.619999885559082,-8.335000038146973 C2.380000114440918,-5.324999809265137 6.300000190734863,0.6949999928474426 6.619999885559082,7.40500020980835 C6.619999885559082,7.40500020980835 6.619999885559082,7.40500020980835 6.619999885559082,7.40500020980835z"></path></g></g><g transform="matrix(1,0,0,1,31.9950008392334,35.665000915527344)" opacity="1" style="display: block;"><g opacity="1" transform="matrix(1,0,0,1,0,0)"><path fill="rgb(255,255,255)" fill-opacity="1" d=" M6.635000228881836,-2.4049999713897705 C2.565000057220459,-0.375 0.004999999888241291,3.7850000858306885 0.004999999888241291,8.335000038146973 C0.004999999888241291,8.335000038146973 -6.635000228881836,8.335000038146973 -6.635000228881836,8.335000038146973 C-6.635000228881836,1.274999976158142 -2.6449999809265137,-5.184999942779541 3.674999952316284,-8.335000038146973 C3.674999952316284,-8.335000038146973 6.635000228881836,-2.4049999713897705 6.635000228881836,-2.4049999713897705z"></path></g></g><g transform="matrix(1,0,0,1,44,66.322998046875)" opacity="1" style="display: block;"><g opacity="1" transform="matrix(1,0,0,1,0,0)"><path fill="rgb(255,255,255)" fill-opacity="1" d=" M8.319000244140625,-13.677000045776367 C8.319000244140625,-13.677000045776367 19.2189998626709,8.123000144958496 19.2189998626709,8.123000144958496 C13.659000396728516,11.642999649047852 7.068999767303467,13.67300033569336 -0.0010000000474974513,13.67300033569336 C-7.071000099182129,13.67300033569336 -13.66100025177002,11.642999649047852 -19.22100067138672,8.123000144958496 C-19.22100067138672,8.123000144958496 -8.321000099182129,-13.677000045776367 -8.321000099182129,-13.677000045776367 C-6.160999774932861,-11.597000122070312 -3.2309999465942383,-10.32699966430664 -0.0010000000474974513,-10.32699966430664 C3.2290000915527344,-10.32699966430664 6.169000148773193,-11.597000122070312 8.319000244140625,-13.677000045776367z"></path></g></g><g transform="matrix(1,0,0,1,64.68399810791016,27.89699935913086)" opacity="1" style="display: block;"><g opacity="1" transform="matrix(1,0,0,1,0,0)"><path fill="rgb(255,255,255)" fill-opacity="1" d=" M15.314000129699707,16.10700035095215 C15.314000129699707,16.10700035095215 -8.685999870300293,16.10700035095215 -8.685999870300293,16.10700035095215 C-8.685999870300293,11.406999588012695 -11.38599967956543,7.336999893188477 -15.315999984741211,5.367000102996826 C-15.315999984741211,5.367000102996826 -4.576000213623047,-16.10300064086914 -4.576000213623047,-16.10300064086914 C7.214000225067139,-10.192999839782715 15.314000129699707,2.006999969482422 15.314000129699707,16.10700035095215z"></path></g></g><g transform="matrix(1,0,0,1,23.31599998474121,27.89699935913086)" opacity="1" style="display: block;"><g opacity="1" transform="matrix(1,0,0,1,0,0)"><path fill="rgb(255,255,255)" fill-opacity="1" d=" M4.584000110626221,-16.10300064086914 C4.584000110626221,-16.10300064086914 15.314000129699707,5.367000102996826 15.314000129699707,5.367000102996826 C11.383999824523926,7.336999893188477 8.684000015258789,11.406999588012695 8.684000015258789,16.10700035095215 C8.684000015258789,16.10700035095215 -15.315999984741211,16.10700035095215 -15.315999984741211,16.10700035095215 C-15.315999984741211,2.006999969482422 -7.216000080108643,-10.192999839782715 4.584000110626221,-16.10300064086914z"></path></g></g><g transform="matrix(1,0,0,1,44,44)" opacity="1" style="display: block;"><g opacity="1" transform="matrix(1,0,0,1,0,0)"><path fill="rgb(255,255,255)" fill-opacity="1" d=" M0,-4 C2.140000104904175,-4 3.890000104904175,-2.319999933242798 4,-0.20000000298023224 C4,-0.20000000298023224 4,0 4,0 C4,0 4,0.20000000298023224 4,0.20000000298023224 C3.890000104904175,2.319999933242798 2.140000104904175,4 0,4 C-2.2100000381469727,4 -4,2.2100000381469727 -4,0 C-4,-2.2100000381469727 -2.2100000381469727,-4 0,-4z"></path></g></g></g>'
                              })
                            })
                          }, (t) => {
                            t.addEventListener('click', this.toggleFullscreen)
                          }),
                        ]
                      }),
                    ]
                  }),
                ]
              }),
              tag('div', {
                class: 'bpx-player-playrate-hint',
                style: 'display: none',
                children: [
                  tag('span', {
                    class: 'icon', children: tag('svg', {
                      attrs: {
                        viewBox: '0 0 111 66',
                      },
                      innerHTML: '<g clip-path="url(#__lottie_element_421)"><g transform="matrix(1,0,0,1,94.5,32.5)" opacity="1" style=""><g opacity="1" transform="matrix(0,3,-3,0,0,0)"><path fill="rgb(255,255,255)" fill-opacity="1" d=" M6.138000011444092,3.5460000038146973 C6.4679999351501465,4.105999946594238 6.2779998779296875,4.826000213623047 5.7179999351501465,5.156000137329102 C5.538000106811523,5.265999794006348 5.3379998207092285,5.326000213623047 5.118000030517578,5.326000213623047 C5.118000030517578,5.326000213623047 -5.122000217437744,5.326000213623047 -5.122000217437744,5.326000213623047 C-5.771999835968018,5.326000213623047 -6.302000045776367,4.796000003814697 -6.302000045776367,4.145999908447266 C-6.302000045776367,3.936000108718872 -6.242000102996826,3.7260000705718994 -6.142000198364258,3.5460000038146973 C-6.142000198364258,3.5460000038146973 -1.3519999980926514,-4.553999900817871 -1.3519999980926514,-4.553999900817871 C-0.9120000004768372,-5.294000148773193 0.04800000041723251,-5.544000148773193 0.7979999780654907,-5.104000091552734 C1.027999997138977,-4.973999977111816 1.218000054359436,-4.783999919891357 1.3480000495910645,-4.553999900817871 C1.3480000495910645,-4.553999900817871 6.138000011444092,3.5460000038146973 6.138000011444092,3.5460000038146973z"></path></g></g><g transform="matrix(1,0,0,1,55.5,32.5)" opacity="" style=""><g opacity="1" transform="matrix(0,3,-3,0,0,0)"><path fill="rgb(255,255,255)" fill-opacity="1" d=" M6.138000011444092,3.5460000038146973 C6.4679999351501465,4.105999946594238 6.2779998779296875,4.826000213623047 5.7179999351501465,5.156000137329102 C5.538000106811523,5.265999794006348 5.3379998207092285,5.326000213623047 5.118000030517578,5.326000213623047 C5.118000030517578,5.326000213623047 -5.122000217437744,5.326000213623047 -5.122000217437744,5.326000213623047 C-5.771999835968018,5.326000213623047 -6.302000045776367,4.796000003814697 -6.302000045776367,4.145999908447266 C-6.302000045776367,3.936000108718872 -6.242000102996826,3.7260000705718994 -6.142000198364258,3.5460000038146973 C-6.142000198364258,3.5460000038146973 -1.3519999980926514,-4.553999900817871 -1.3519999980926514,-4.553999900817871 C-0.9120000004768372,-5.294000148773193 0.04800000041723251,-5.544000148773193 0.7979999780654907,-5.104000091552734 C1.027999997138977,-4.973999977111816 1.218000054359436,-4.783999919891357 1.3480000495910645,-4.553999900817871 C1.3480000495910645,-4.553999900817871 6.138000011444092,3.5460000038146973 6.138000011444092,3.5460000038146973z"></path></g></g><g transform="matrix(1,0,0,1,16.5,32.5)" style=""><g opacity="1" transform="matrix(0,3,-3,0,0,0)"><path fill="rgb(255,255,255)" fill-opacity="1" d=" M6.138000011444092,3.5460000038146973 C6.4679999351501465,4.105999946594238 6.2779998779296875,4.826000213623047 5.7179999351501465,5.156000137329102 C5.538000106811523,5.265999794006348 5.3379998207092285,5.326000213623047 5.118000030517578,5.326000213623047 C5.118000030517578,5.326000213623047 -5.122000217437744,5.326000213623047 -5.122000217437744,5.326000213623047 C-5.771999835968018,5.326000213623047 -6.302000045776367,4.796000003814697 -6.302000045776367,4.145999908447266 C-6.302000045776367,3.936000108718872 -6.242000102996826,3.7260000705718994 -6.142000198364258,3.5460000038146973 C-6.142000198364258,3.5460000038146973 -1.3519999980926514,-4.553999900817871 -1.3519999980926514,-4.553999900817871 C-0.9120000004768372,-5.294000148773193 0.04800000041723251,-5.544000148773193 0.7979999780654907,-5.104000091552734 C1.027999997138977,-4.973999977111816 1.218000054359436,-4.783999919891357 1.3480000495910645,-4.553999900817871 C1.3480000495910645,-4.553999900817871 6.138000011444092,3.5460000038146973 6.138000011444092,3.5460000038146973z"></path></g></g></g>'
                    })
                  }),
                  tag('span', { class: 'text', innerHTML: '倍速播放中' })
                ]
              }),
              tag('div', {
                class: 'bpx-player-tooltip-incenter',
                children: tag('div', {
                  class: 'incenter bpx-player-tooltip-item',
                  children: tag('span', { class: 'text', innerHTML: '' })
                })
              }),
            ]
          }),
          tag('div', { class: 'bpx-player-sending-area' }),
          tag('div', {
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
          }),
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
      if (isMobile()) {
        this.playerElement.querySelector('.bpx-player-control').style.opacity = 0;
      }
    }
    playerEnter() {
      this.playerElement.style.cursor = 'pointer';
      this.playerElement.classList.add('hover');
      if (isMobile()) {
        this.playerElement.querySelector('.bpx-player-control').style.opacity = 1;
      }
      clearTimeout(this.leave_timer);
      this.leave_timer = setTimeout(() => this.playerLeave(), 3000);
    }

    /**
     * 进度条渲染
     */
    progress_render() {
      const video_buffer = this.videoElement.buffered;
      const video_buffered = video_buffer.length > 0 ? video_buffer.end(video_buffer.length - 1) : 0;
      const duration = this.duration;
      const buffered = video_buffered / duration;

      const current = this.currentTime / duration;
      const total_px = this.progressElement.querySelector('.schedule').clientWidth;
      this.progressElement.querySelector('.buffer').style.transform = 'scaleX(' + buffered + ')';
      this.progressElement.querySelector('.current').style.transform = 'scaleX(' + current + ')';
      this.progressElement.querySelector('.thumb').style.transform = 'translateX(' + current * total_px + 'px)';
      this.playerElement.querySelector('.control-btn.time .current').innerHTML = formatTime(this.currentTime);

    }

    /**
     * 视频播放/暂停
     */
    videoClick() {
      if (this.paused) {
        this.play();
      } else {
        this.pause();
      }
    }

    /**
     * 监听
     */
    startListening() {
      /**
       * player 节点监听
       */
      this.playerElement.addEventListener('mouseenter', () => this.playerEnter());
      this.playerElement.addEventListener('mousemove', () => this.playerEnter());
      this.playerElement.addEventListener('mouseleave', () => this.playerLeave());
      if (isMobile()) {
        this.playerElement.addEventListener('touchstart', () => this.playerEnter());
        this.playerElement.addEventListener('touchmove', () => this.playerEnter());
        this.playerElement.addEventListener('touchend', () => this.playerLeave());
      }
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
            toggleFullscreen();
            break;
          // 播放/暂停
          case 'Space':
            e.preventDefault();
            this.videoClick();
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

      /**
       * 视频节点监听
       */
      this.videoElement.addEventListener('canplay', (e) => {
        this.playerElement.querySelector('.control-btn.time .duration').innerHTML = formatTime(this.duration);
        this.playerElement.querySelector('.bpx-player-loading-panel').classList.remove('bpx-state-loading');
        this.play();
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
      
      this.videoElement.addEventListener('click', () => this.videoClick());
      this.playerElement.querySelector('.control-btn.play').addEventListener('click', () => this.videoClick());
      this.videoElement.addEventListener('timeupdate', () => {
        if (this.progress_is_mousedown) return;
        this.progress_render();
      });
      this.videoElement.addEventListener('error', (e) => {
        console.warn('视频播放失败 ');
      })

      this.videoElement.addEventListener('waiting', async () => {
        if (!this.waiting) {
          this.waiting = true;
          this.playerElement.classList.add('bpx-state-buff');
        }
      })
      this.videoElement.addEventListener('playing', async () => {
        if (this.waiting) {
          this.waiting = false;
          this.playerElement.classList.remove('bpx-state-buff');
        }
        
      })

      /**
       * 进度条节点监听
       */
      let idx;
      const progress_func = (e) => {
        let x = (e.clientX - this.progressElement.getBoundingClientRect().left + 2);
        if (x < 0 || x > this.progressElement.clientWidth) return;
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
    }

    /**
     * @returns {String}
     */
    get url() {
      return this.#url;
    }
    /**
     * @param {String} u
     */
    set url(u) {
      this.#url = u;
      this.videoElement.src = u;
      this.videoElementPreview.src = u;
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
  
  window.addEventListener('load', () => {
    let style = document.createElement('style');
    style.innerHTML = styles;
    document.body.after(style);
  })
  
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
})();