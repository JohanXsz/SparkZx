// Count-Up للإحصائيات
window.addEventListener('load', () => {
    const statsElements = document.querySelectorAll('.stat');
    statsElements.forEach((stat, index) => {
        setTimeout(() => {
            stat.classList.add('show');
            const target = +stat.getAttribute('data-target');
            const number = stat.querySelector('h2');
            let count = 0;
            const step = Math.ceil(target / 100);
            const interval = setInterval(() => {
                count += step;
                if (count >= target) {
                    number.textContent = target;
                    clearInterval(interval);
                } else { number.textContent = count; }
            }, 15);
        }, index * 400);
    });
});

// إنشاء نقاط Neon صغيرة تتحرك
const particlesContainer = document.getElementById('particles');
for (let i = 0; i < 50; i++) {
    const p = document.createElement('div');
    p.classList.add('particle');
    p.style.left = Math.random() * 100 + '%';
    p.style.top = Math.random() * 100 + '%';
    p.style.animationDuration = (5 + Math.random() * 5) + 's';
    particlesContainer.appendChild(p);
}

// Neon trail عند تحريك الماوس
const trail = document.getElementById('trail');
document.addEventListener('mousemove', (e) => {
    trail.style.transform = `translate(${e.clientX-6}px,${e.clientY-6}px)`;
});

// تغيير Neon يدوياً عند الضغط على أي لون
const colorButtons = document.querySelectorAll('.color-btn');
colorButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        const color = btn.getAttribute('data-color');
        document.documentElement.style.setProperty('--neon', color);
    });
});

// ---------- كود التحكم بالفيديو واظهار/اخفاء البروفايل (مصحح) ----------

const video = document.getElementById('bg-video');
const playBtn = document.getElementById('play-sound');
const toggleSoundBtn = document.getElementById('toggle-sound');
const toggleProfileBtn = document.getElementById('toggle-profile');
const profileCard = document.querySelector('.profile-card');

// زر تشغيل الصوت للمرة الأولى (بعض المتصفحات تطلب تفاعل مستخدم لصوت الفيديو)
if (playBtn) {
    playBtn.addEventListener('click', () => {
        if (!video) return;
        video.muted = false; // فك الكتم
        video.play().catch(err => {
            // بعض المتصفحات تمنع التشغيل التلقائي بالصوت؛ هذا يلتقط الخطأ.
            console.warn('تعذر تشغيل الفيديو بصوت: ', err);
        });
        playBtn.style.display = 'none'; // اخفاء زر التشغيل الأولي بعد الضغط
    });
}

// زر لتبديل كتم/تشغيل الصوت
if (toggleSoundBtn) {
    // عيّن النص الابتدائي حسب حالة الفيديو الحالية
    toggleSoundBtn.textContent = video && video.muted ? '🔇 كتم' : '🔊 تشغيل';
    toggleSoundBtn.addEventListener('click', () => {
        if (!video) return;
        video.muted = !video.muted;
        toggleSoundBtn.textContent = video.muted ? '🔇 كتم' : '🔊 تشغيل';
        // لو الفيديو متوقف لسبب ما، حاول تشغيله عند إلغاء الكتم
        if (!video.muted) {
            video.play().catch(() => {});
        }
    });
}

// زر لإخفاء وإظهار بطاقة البروفايل
if (toggleProfileBtn && profileCard) {
    toggleProfileBtn.addEventListener('click', () => {
        // نخفي العنصر بأكمله (يختفي المحتوى الداخلي أيضاً)
        const isHidden = window.getComputedStyle(profileCard).display === 'none';
        if (isHidden) {
            profileCard.style.display = ''; // ارجاع إلى القيمة الافتراضية (CSS يتولى الباقي)
            toggleProfileBtn.textContent = '👁️ إخفاء / إظهار البروفايل';
        } else {
            profileCard.style.display = 'none';
            toggleProfileBtn.textContent = '👁️ إظهار البروفايل';
        }
    });
}