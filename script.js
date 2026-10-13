const EVENT_CONFIG = {
            date: "Nov 15, 2026 14:00:00",
            shareText: `YOU'RE INVITED.\n\nForged2k26. ✨\n\nJoin us for an exclusive party experience!\n\n📅 15 November 2026\n⏰ 2:00 PM – 7:00 PM\n📍 Studio XO, Apollo High Street\n\nOrganized by:\nPratham Khatri\nMradul Sharma\nVedant Singh Panwar\n\nGet the event details and booking information here:\n`
        };

        // Intro Sequence
        function enterExperience() {
            const intro = document.getElementById('intro');
            intro.style.opacity = '0';
            document.body.style.overflowY = 'auto'; // Unlock scroll
            setTimeout(() => { intro.style.display = 'none'; }, 1200);
        }

        // Scroll spy for bottom nav
        const sections = document.querySelectorAll('section');
        const navLinks = document.querySelectorAll('.nav-link');

        window.addEventListener('scroll', () => {
            let current = '';
            // Determine which section is currently in view
            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                if (scrollY >= sectionTop - 300) {
                    current = section.getAttribute('id');
                }
            });

            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href').includes(current)) {
                    link.classList.add('active');
                }
            });
        });

        // Countdown Timer
        const countDownDate = new Date(EVENT_CONFIG.date).getTime();
        const timerInterval = setInterval(function() {
            const now = new Date().getTime();
            const distance = countDownDate - now;

            if (distance < 0) {
                clearInterval(timerInterval);
                document.getElementById("countdown-container").innerHTML = "<div class='time-val' style='grid-column: 1/-1;'>THE NIGHT HAS ARRIVED</div>";
                return;
            }

            document.getElementById("cd-days").innerText = String(Math.floor(distance / (1000 * 60 * 60 * 24))).padStart(2, '0');
            document.getElementById("cd-hours").innerText = String(Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))).padStart(2, '0');
            document.getElementById("cd-mins").innerText = String(Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))).padStart(2, '0');
            document.getElementById("cd-secs").innerText = String(Math.floor((distance % (1000 * 60)) / 1000)).padStart(2, '0');
        }, 1000);

        // Booking Logic
        function updateSummary() {
            const qty = document.getElementById('res-qty').value;
            document.getElementById('booking-summary').innerText = `Requesting ${qty} General Admission ticket${qty > 1 ? 's' : ''}. Organizer confirmation required.`;
        }

                function handleBooking(event) {
            event.preventDefault();
            
            // Get user input values
            const name = document.getElementById('res-name').value;
            const phone = document.getElementById('res-phone').value;
            const qty = document.getElementById('res-qty').value;
            
            // Format the message for WhatsApp
            const message = `*NEW TICKET REQUEST* \n\n*Name:* ${name}\n*Contact:* ${phone}\n*Tickets Required:* ${qty}\n\nHi, I would like to purchase tickets for the upcoming event.`;
            
            // Send to the specified number (91 added for India country code)
            const whatsappUrl = `https://wa.me/919340016063?text=${encodeURIComponent(message)}`;
            window.open(whatsappUrl, '_blank');

            // Hide form and show success message on the website
            document.getElementById('booking-form-container').style.display = 'none';
            
            document.getElementById('success-name').innerText = name;
            document.getElementById('success-qty').innerText = qty;
            document.getElementById('success-phone').innerText = phone;
            
            const successDiv = document.getElementById('booking-success');
            successDiv.style.display = 'block';
            successDiv.style.animation = 'fadeIn 1s forwards';
        }


        // WhatsApp Share
        function shareOnWhatsApp() {
            const currentUrl = window.location.href.includes('file://') ? 'https://mokshbaviskar.github.io/ComingSoon/' : window.location.href;
            const fullMessage = EVENT_CONFIG.shareText + currentUrl;
            window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(fullMessage)}`, '_blank');
        }

        // Copy Link
        function copyLink() {
            navigator.clipboard.writeText(window.location.href).then(() => {
                showToast("Invitation link copied!");
            }).catch(() => showToast("Failed to copy link."));
        }

        function showToast(message) {
            const toast = document.getElementById("toast");
            toast.innerText = message;
            toast.className = "show";
            setTimeout(() => { toast.className = toast.className.replace("show", ""); }, 2500);
}
