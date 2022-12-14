const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const audio = $("#audio");
const playlistList = $(".playlist__list");
const cd = $(".cd__img");
const songName = $(".song__name");
const songAuthor = $(".song__author");
const songDuration = $(".progress-time__duration");
const songCurrentTime = $(".progress-time__current-time");
const showPlaylistIcon = $(".list-music__icon");
const closePlaylistIcon = $(".close-list");
const playlist = $(".playlist__container");
const playlistInner = $(".playlist");
const playBtn = $(".btn__play");
const prevBtn = $(".btn__previous");
const nextBtn = $(".btn__next");
const randomBtn = $(".btn__random");
const repeatBtn = $(".btn__repeat");
const progressBar = $(".progress-bar");
const progress = $(".progress-bar__value");
const volumeBtn = $(".volume");
const volumeBar = $(".volume-bar");
const volume = $(".volume-bar__value");
const heartIcon = $(".favourite");

const songPlayedList = new Set();

const app = {
	currentIndex: 0,
	currentVolume: 1,
	isPlaying: false,
	isRepeat: false,
	isRandom: false,
	isMute: false,
	isHoldProgressBar: false,
	isHoldVolumeBar: false,
	isFavourite: false,
	songs: [
		{
			name: "Love Faded",
			author: "Leony",
			image: "./assets/img/meo.jpg",
			path: "./assets/music/love_faded_leony.mp3",
		},
		{
			name: "Bất Bình Thường",
			author: "WHEE!",
			image: "./assets/img/images.jfif",
			path: "./assets/music/bat_binh_thuong.mp3",
		},
		{
			name: "Từ Chối Anh Nhẹ Nhàng Thôi",
			author: "Bích Phương x Phúc Du",
			image: "https://otc-restaurants.com/wp-content/uploads/2021/12/4-bich-phuong-sinh-nam-bao-nhieu.jpg",
			path: "./assets/music/phuc_du_feat_bich_phuong_tu_choi_nhe_nhang_thoi_official_m_v_6819276646062757250.mp3",
		},
		{
			name: "Anh Biết Em Cũng Biết",
			author: "Nger x Hngan",
			image: "https://static2.yan.vn/YanNews/2167221/202201/hnhngan-la-ai-thong-tin-tieu-su-cua-hanh-ngan-5c86b192.jpeg",
			path: "./assets/music/anh_biet_em_cung_biet_ngo_ngan.mp3",
		},
		{
			name: "Lý Do Anh Bỏ Em Vào Balo",
			author: "Tân Trần",
			image: "https://photo-resize-zmp3.zmdcdn.me/w240_r1x1_jpeg/cover/9/2/d/1/92d1087e7b366b4cf7d1539d37e5f610.jpg",
			path: "./assets/music/ly_do_anh_bo_em_vao_balo.mp3",
		},
		{
			name: "Forget Me Now",
			author: "Fishy x Tri Dung",
			image: "https://photo-resize-zmp3.zmdcdn.me/w240_r1x1_jpeg/cover/4/b/1/6/4b1620e9ea2484a239b30e6536844181.jpg",
			path: "./assets/music/fishy_tri_dung_forget_me_now.mp3",
		},
		{
			name: "Precious",
			author: "DaDuc x Kiper",
			image: "./assets/img/hun.gn_1.png",
			path: "./assets/music/precious_daduc_ft_kiper_t_cukak_remix_official_lyrics_video_-7386399315721234926.mp3",
		},
		{
			name: "Melody",
			author: "Ziv x Kipes",
			image: "https://i.ytimg.com/vi/XT-sPeuenyE/maxresdefault.jpg",
			path: "https://cdn.glitch.global/d4fabaee-311a-4959-830b-206e627b684e/vietsub_melody_ziv_kipes_-6035725810216122539.mp3?v=1663745572520",
		},
		{
			name: "Yêu Em Qua Dòng Tin Nhắn",
			author: "Nger x Hngan",
			image: "https://photo-resize-zmp3.zmdcdn.me/w360_r1x1_jpeg/cover/4/9/0/7/490702cd8724942cfb1290768163d530.jpg",
			path: "https://cdn.glitch.global/d4fabaee-311a-4959-830b-206e627b684e/yeu_em_qua_dong_tin_nhan_ieu_iem_qua_dong_tin_nhan_ngo_ft_nan_lyrics_video_950071120526878069.mp3?v=1663745687462",
		},
		{
			name: "Em Thích - Lofi",
			author: "Sean x Lua",
			image: "https://lyricvn.com/wp-content/uploads/2021/12/7e592379f3f1c0ae65807133605ee5bf.jpg",
			path: "https://cdn.glitch.global/d4fabaee-311a-4959-830b-206e627b684e/em_thich_lofi_ver_sean_x_lua_x_freak_d_-8634849872992836799.mp3?v=1663745850926",
		},
		{
			name: "Nếu Anh Khum Phiền",
			author: "Kaity Nguyễn",
			image: "./assets/img/my_luv.jpg",
			path: "https://cdn.glitch.global/d4fabaee-311a-4959-830b-206e627b684e/neu_anh_khong_phien_kaity_nguyen_x_soho_speed_up_-8204844179314786636.mp3?v=1663745856959",
		},
		{
			name: "Yours",
			author: "Chanyeol x Lee Hi",
			image: "./assets/img/meo_meo.jpg",
			path: "https://cdn.glitch.global/d4fabaee-311a-4959-830b-206e627b684e/chanyeol_ft_lee_hi_yours_speed_up_nihtcore_-6515365115094543279.mp3?v=1663745618865",
		},
		{
			name: "Say Yes",
			author: "LOCO x Punch",
			image: "./assets/img/meomeomeo.jpg",
			path: "https://cdn.glitch.global/d4fabaee-311a-4959-830b-206e627b684e/vietsub_lyrics_say_yes_loco_punch_speed_up_nhac_hot_remix_tiktok_166807903743438515.mp3?v=1663745637450",
		},
	],

	renderSong() {
		const htmls = this.songs.map((song, index) => {
			return `
            <li class="playlist__item" data-index="${index}">
                <div class="playlist__item-img">
                    <img src="${song.image}" alt="">
                </div>
                <div class="playlist__item-info">
                    <h3 class="playlist__item-name">${song.name}</h3>
                    <p class="playlist__item-author">${song.author}</p>
                </div>
                <div class="music-waves">  
                    <span></span>  
                    <span></span>  
                    <span></span>  
                    <span></span>  
                    <span></span>
                </div>
                <span class="playlist__item-option">
                    <i class="fa-solid fa-ellipsis"></i>
                </span>
            </li>
            `;
		});
		playlistList.innerHTML = htmls.join("");
	},

	activeSong() {
		const songs = $$(".playlist__item");
		const musicWaves = $$(".music-waves");
		songs.forEach((song, index) => {
			if (index === this.currentIndex) {
				song.classList.add("active");
				musicWaves[index].classList.add("active");
				song.scrollIntoView({
					behavior: "smooth",
					block: "center",
					inline: "center",
				});
			} else {
				song.classList.remove("active");
				musicWaves[index].classList.remove("active");
			}
		});
	},

	defineProperties() {
		Object.defineProperty(this, "currenSong", {
			get: () => this.songs[this.currentIndex],
		});
	},

	timeFormat(seconds) {
		const date = new Date(null);
		date.setSeconds(seconds);
		return date.toISOString().slice(14, 19);
	},

	togglePlaylist() {
		playlist.classList.toggle("list-open");
	},

	loadCurrentSong() {
		const _this = this; // this là app
		songName.textContent = this.currenSong.name;
		songAuthor.textContent = this.currenSong.author;
		cd.src = this.currenSong.image;
		audio.src = this.currenSong.path;
		progress.style.width = 0;

		// Xử lý lấy tiến trình và thời lượng bài hát trước khi phát
		audio.onloadedmetadata = function () {
			songCurrentTime.textContent = _this.timeFormat(this.currentTime.toFixed(2));
			songDuration.textContent = _this.timeFormat(this.duration.toFixed(2));
		};
	},

	prevSong() {
		this.currentIndex--;
		if (this.currentIndex < 0) this.currentIndex = this.songs.length - 1;
		this.loadCurrentSong();
		this.activeSong();
	},

	nextSong() {
		this.currentIndex++;
		if (this.currentIndex > this.songs.length - 1) this.currentIndex = 0;
		this.loadCurrentSong();
		this.activeSong();
	},

	// Xử lý random song nhưng sẽ hết tất cả các bài
	randomSong() {
		let random;
		do {
			random = Math.floor(Math.random() * this.songs.length);
		} while (songPlayedList.has(random));
		this.currentIndex = random;
		this.loadCurrentSong();
		songPlayedList.add(random);
		if (songPlayedList.size === this.songs.length) {
			songPlayedList.clear();
		}
		this.activeSong();
	},

	repeatSong() {
		this.loadCurrentSong();
		this.activeSong();
	},

	handleEvents() {
		const _this = this;
		_this.activeSong();

		// Xử lý quay CD khi play / pause nhạc
		const cdRotate = cd.animate(
			{
				transform: ["rotate(0)", "rotate(360deg)"],
			},
			{
				duration: 7500, //7500 seconds
				iterations: Infinity, // lặp lại vô hạn
			}
		);
		cdRotate.pause();

		// Xử lý Play / Pause khi click
		playBtn.onclick = function () {
			if (_this.isPlaying) {
				audio.pause();
			} else {
				audio.play();
			}
		};
		audio.onplay = function () {
			playBtn.classList.add("playing");
			cdRotate.play();
			_this.isPlaying = true;
		};
		audio.onpause = function () {
			playBtn.classList.remove("playing");
			cdRotate.pause();
			_this.isPlaying = false;
		};

		// Xử lý thời current time và thanh tiến trình
		audio.ontimeupdate = function () {
			songCurrentTime.textContent = _this.timeFormat(this.currentTime);
			const progressPercent = (this.currentTime / this.duration) * 100;
			progress.style.width = progressPercent + "%";
		};

		// Xử lý Next / Previous Song
		prevBtn.onclick = function () {
			if (_this.isRepeat) {
				_this.repeatSong();
			} else {
				if (_this.isRandom) {
					_this.randomSong();
				} else {
					_this.prevSong();
				}
			}
			cdRotate.cancel();
			if (_this.isPlaying) {
				audio.play();
			}
		};
		nextBtn.onclick = function () {
			if (_this.isRepeat) {
				_this.repeatSong();
			} else {
				if (_this.isRandom) {
					_this.randomSong();
				} else {
					_this.nextSong();
				}
			}
			cdRotate.cancel();
			if (_this.isPlaying) {
				audio.play();
			}
		};

		// Xử lý next bài, random bài hoặc phát lại khi hết bài
		// Khi lặp thì không phát ngẫu nhiên
		repeatBtn.onclick = function () {
			_this.isRepeat = !_this.isRepeat;
			this.classList.toggle("active", _this.isRepeat);
		};
		randomBtn.onclick = function () {
			_this.isRandom = !_this.isRandom;
			this.classList.toggle("active", _this.isRandom); // _this.isRandom = true thì active, false thì remove
		};
		audio.onended = function () {
			if (!_this.isRepeat) {
				if (_this.isRandom) {
					_this.randomSong();
					cdRotate.cancel();
				} else {
					_this.nextSong();
					cdRotate.cancel();
				}
				audio.play();
			} else {
				_this.repeatSong();
				audio.play();
			}
		};

		// Xử lý show / hide Playlist
		showPlaylistIcon.onclick = function () {
			_this.togglePlaylist();
		};
		closePlaylistIcon.onclick = function () {
			_this.togglePlaylist();
		};
		playlist.onclick = function () {
			_this.togglePlaylist();
		};
		playlistInner.onclick = function () {
			event.stopPropagation();
		};

		// Xử lý Playlist
		// Xử lý play song khi click trong Playlist
		const songs = $$(".playlist__item");
		songs.forEach((song, index) => {
			const option = song.querySelector(".playlist__item-option");
			option.onclick = function () {
				event.stopPropagation();
			};
			song.onclick = function (e) {
				if (e.target != option && _this.currentIndex != index) {
					_this.currentIndex = index;
					_this.loadCurrentSong();
					_this.activeSong();
					audio.play();
				}
			};
		});

		// Xử lý volume
		volumeBtn.onclick = function () {
			_this.isMute = !_this.isMute;
			this.classList.toggle("active", _this.isMute);
			if (_this.isMute) audio.volume = 0;
			else audio.volume = _this.currentVolume;
		};

		// Xử lý Favourite List
		heartIcon.onclick = function () {
			_this.isFavourite = !_this.isFavourite;
			this.classList.toggle("active");
			const tooltip = this.querySelector("span");
			if (_this.isFavourite) {
				tooltip.textContent = "Remove Favourite";
				tooltip.style.bottom = "80%";
			} else {
				tooltip.textContent = "Add Favourite";
				tooltip.style.bottom = "70%";
			}
		};

		// Xử lý MOUSE EVENT
		// Xử lý Seek, tua nhạc và thanh tiến trình
		progressBar.onmousedown = function (e) {
			audio.currentTime = (e.offsetX / this.offsetWidth) * audio.duration;
			// Đặt cái này để làm được vừa giữ vừa kéo
			_this.isHoldProgressBar = true;
		};
		progressBar.onmousemove = function (e) {
			if (_this.isHoldProgressBar) {
				audio.currentTime = (e.offsetX / this.offsetWidth) * audio.duration;
			}
		};
		// Xử lý thanh volume
		volumeBar.onmousedown = function (e) {
			if (e.offsetX >= 0 && e.offsetX <= this.offsetWidth) {
				_this.currentVolume = (e.offsetX / this.offsetWidth).toFixed(2);
				audio.volume = _this.currentVolume;
				volume.style.width = audio.volume * 100 + "%";
				if (audio.volume === 0) _this.isMute = true;
				else _this.isMute = false;
				_this.isHoldVolumeBar = true;
			}
		};
		volumeBar.onmousemove = function (e) {
			if (_this.isHoldVolumeBar) {
				if (e.offsetX >= 0 && e.offsetX <= this.offsetWidth) {
					_this.currentVolume = (e.offsetX / this.offsetWidth).toFixed(2);
					audio.volume = _this.currentVolume;
					volume.style.width = audio.volume * 100 + "%";
					if (audio.volume === 0) _this.isMute = true;
					else _this.isMute = false;
				}
			}
		};
		audio.onvolumechange = function () {
			if (_this.isMute) {
				volumeBtn.classList.add("active");
				volume.style.width = 0;
			} else {
				volumeBtn.classList.remove("active");
				volume.style.width = this.volume * 100 + "%";
			}
		};
		window.onmouseup = function () {
			_this.isHoldProgressBar = false;
			_this.isHoldVolumeBar = false;
		};

		// Xử lý Keyboard Events
		// Ấn space để Play / Pause Music
		document.onkeyup = function (e) {
			if (e.which === 32) {
				playBtn.click();
			}
		};
	},

	start() {
		// Định nghĩa các thuộc tính
		this.defineProperties();

		// Xử lý render bài hát ra Playlist
		this.renderSong();

		// Tải bài hát hiện tại vào UI để sẵn sàng phát nhạc
		this.loadCurrentSong();

		// Lắng nghe, xử lý các sự kiện (DOM Events)
		this.handleEvents();
	},
};
app.start();
