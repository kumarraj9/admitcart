document.addEventListener('DOMContentLoaded', () => {

    // Initialize Lucide Icons
    if (window.lucide) {
        window.lucide.createIcons();
    }

    /* ==========================================================================
       Header Scroll Effect & Mobile Navigation
       ========================================================================== */
    const header = document.getElementById('header');
    const hamburgerMenu = document.getElementById('hamburgerMenu');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    hamburgerMenu.addEventListener('click', () => {
        hamburgerMenu.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close menu when clicking a link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            hamburgerMenu.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });


    /* ==========================================================================
       Interactive Country Tab Selector
       ========================================================================== */
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');

    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            const targetCountry = button.getAttribute('data-tab');

            // Toggle active buttons
            tabButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            // Toggle active content
            tabContents.forEach(content => {
                const contentId = content.getAttribute('id');
                if (contentId === `tab-${targetCountry}`) {
                    content.classList.add('active');
                } else {
                    content.classList.remove('active');
                }
            });
        });
    });


    /* ==========================================================================
       EMI Loan Calculator Math
       ========================================================================== */
    const loanAmountInput = document.getElementById('loanAmount');
    const interestRateInput = document.getElementById('interestRate');
    const loanTenureInput = document.getElementById('loanTenure');

    const amountVal = document.getElementById('amountVal');
    const rateVal = document.getElementById('rateVal');
    const tenureVal = document.getElementById('tenureVal');

    const monthlyEmiText = document.getElementById('monthlyEmi');
    const totalPrincipalText = document.getElementById('totalPrincipal');
    const totalInterestText = document.getElementById('totalInterest');

    function formatCurrency(amount) {
        // Formats to Indian Rupee (INR) style: e.g. ₹25,00,000
        return '₹' + Math.round(amount).toLocaleString('en-IN');
    }

    function calculateEMI() {
        const principal = parseFloat(loanAmountInput.value);
        const annualRate = parseFloat(interestRateInput.value);
        const tenureYears = parseFloat(loanTenureInput.value);

        // Update Slider Labels
        amountVal.textContent = formatCurrency(principal);
        rateVal.textContent = annualRate.toFixed(1) + '%';
        tenureVal.textContent = tenureYears + (tenureYears === 1 ? ' Year' : ' Years');

        // EMI Calculations
        const monthlyRate = annualRate / 12 / 100;
        const totalMonths = tenureYears * 12;

        let monthlyEmi = 0;
        if (monthlyRate === 0) {
            monthlyEmi = principal / totalMonths;
        } else {
            monthlyEmi = (principal * monthlyRate * Math.pow(1 + monthlyRate, totalMonths)) / 
                          (Math.pow(1 + monthlyRate, totalMonths) - 1);
        }

        const totalAmountPayable = monthlyEmi * totalMonths;
        const totalInterestPayable = totalAmountPayable - principal;

        // Update Output values
        monthlyEmiText.textContent = formatCurrency(monthlyEmi);
        totalPrincipalText.textContent = formatCurrency(principal);
        totalInterestText.textContent = formatCurrency(totalInterestPayable);
    }

    // Attach listeners
    if (loanAmountInput && interestRateInput && loanTenureInput) {
        loanAmountInput.addEventListener('input', calculateEMI);
        interestRateInput.addEventListener('input', calculateEMI);
        loanTenureInput.addEventListener('input', calculateEMI);

        // Initial Calculation Run
        calculateEMI();
    }


    /* ==========================================================================
       Multi-Step Assessment Form Wizard
       ========================================================================== */
    const step1 = document.getElementById('step1');
    const step2 = document.getElementById('step2');
    const step3 = document.getElementById('step3');
    const progressFill = document.getElementById('progressFill');
    const stepNums = document.querySelectorAll('.step-num');

    const next1Btn = document.getElementById('next1');
    const next2Btn = document.getElementById('next2');
    const prev2Btn = document.getElementById('prev2');
    const prev3Btn = document.getElementById('prev3');
    
    const assessmentForm = document.getElementById('assessmentForm');
    const successScreen = document.getElementById('successScreen');
    const successName = document.getElementById('successName');
    const successPhone = document.getElementById('successPhone');
    const successResetBtn = document.getElementById('successReset');

    function updateFormProgress(currentStep) {
        let percent = 0;
        if (currentStep === 1) percent = 0;
        else if (currentStep === 2) percent = 50;
        else if (currentStep === 3) percent = 100;

        progressFill.style.width = `${percent}%`;

        stepNums.forEach((step, idx) => {
            const stepIndex = idx + 1;
            if (stepIndex < currentStep) {
                step.classList.add('completed');
                step.classList.remove('active');
            } else if (stepIndex === currentStep) {
                step.classList.add('active');
                step.classList.remove('completed');
            } else {
                step.classList.remove('active', 'completed');
            }
        });
    }

    // Step navigation event handlers
    if (next1Btn) {
        next1Btn.addEventListener('click', () => {
            // Check if at least one country is selected
            const countries = document.querySelectorAll('input[name="targetCountry"]:checked');
            if (countries.length === 0) {
                alert('Please select at least one study destination.');
                return;
            }
            step1.classList.remove('active');
            step2.classList.add('active');
            updateFormProgress(2);
        });
    }

    if (next2Btn) {
        next2Btn.addEventListener('click', () => {
            const degreeSelected = document.querySelector('input[name="degreeLevel"]:checked');
            if (!degreeSelected) {
                alert('Please select your degree level.');
                return;
            }
            step2.classList.remove('active');
            step3.classList.add('active');
            updateFormProgress(3);
        });
    }

    if (prev2Btn) {
        prev2Btn.addEventListener('click', () => {
            step2.classList.remove('active');
            step1.classList.add('active');
            updateFormProgress(1);
        });
    }

    if (prev3Btn) {
        prev3Btn.addEventListener('click', () => {
            step3.classList.remove('active');
            step2.classList.add('active');
            updateFormProgress(2);
        });
    }

    // Form Submission
    if (assessmentForm) {
        assessmentForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const name = document.getElementById('fullName').value.trim();
            const email = document.getElementById('emailId').value.trim();
            const phone = document.getElementById('phoneNumber').value.trim();

            if (!name || !email || !phone) {
                alert('Please fill out all contact fields.');
                return;
            }

            // Hide form steps and show success overlay
            assessmentForm.style.display = 'none';
            successScreen.classList.add('active');

            // Set customer feedback info
            successName.textContent = name;
            successPhone.textContent = `+91 ${phone}`;
        });
    }

    if (successResetBtn) {
        successResetBtn.addEventListener('click', () => {
            // Reset fields
            assessmentForm.reset();
            
            // Go back to step 1
            successScreen.classList.remove('active');
            assessmentForm.style.display = 'block';
            step3.classList.remove('active');
            step2.classList.remove('active');
            step1.classList.add('active');
            
            updateFormProgress(1);
        });
    }


    /* ==========================================================================
       Student Testimonials Slider
       ========================================================================== */
    const testimonialCards = document.querySelectorAll('.testimonial-card');
    const dots = document.querySelectorAll('.slider-dots .dot');
    const prevBtn = document.getElementById('sliderPrev');
    const nextBtn = document.getElementById('sliderNext');
    let currentSlide = 0;
    let slideInterval;

    function showSlide(index) {
        testimonialCards.forEach(card => card.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));

        testimonialCards[index].classList.add('active');
        dots[index].classList.add('active');
        currentSlide = index;
    }

    function nextSlide() {
        let index = currentSlide + 1;
        if (index >= testimonialCards.length) index = 0;
        showSlide(index);
    }

    function prevSlide() {
        let index = currentSlide - 1;
        if (index < 0) index = testimonialCards.length - 1;
        showSlide(index);
    }

    function startAutoSlide() {
        slideInterval = setInterval(nextSlide, 7000); // changes slide every 7 seconds
    }

    function resetAutoSlide() {
        clearInterval(slideInterval);
        startAutoSlide();
    }

    if (testimonialCards.length > 0) {
        nextBtn.addEventListener('click', () => {
            nextSlide();
            resetAutoSlide();
        });

        prevBtn.addEventListener('click', () => {
            prevSlide();
            resetAutoSlide();
        });

        dots.forEach(dot => {
            dot.addEventListener('click', () => {
                const idx = parseInt(dot.getAttribute('data-index'));
                showSlide(idx);
                resetAutoSlide();
            });
        });

        // Start Auto Slider
        startAutoSlide();
    }


    /* ==========================================================================
       FAQ Accordion Toggles
       ========================================================================== */
    const faqQuestions = document.querySelectorAll('.faq-question');

    faqQuestions.forEach(question => {
        question.addEventListener('click', () => {
            const faqItem = question.parentElement;
            const isActive = faqItem.classList.contains('active');

            // Close all items
            document.querySelectorAll('.faq-item').forEach(item => {
                item.classList.remove('active');
            });

            // Toggle selected item
            if (!isActive) {
                faqItem.classList.add('active');
            }
        });
    });

});
