$(function () {
    // 1. Funções para Likes/Dislikes
    function initLikeButtons() {
        $('.like-btn, .dislike-btn').each(function() {
            const project = $(this).data('project');
            const type = $(this).hasClass('like-btn') ? 'like' : 'dislike';
            const count = localStorage.getItem(`${project}-${type}`) || $(this).find('span').text();
            
            $(this).find('span').text(count);
            
            if (localStorage.getItem(`${project}-voted`) === type) {
                $(this).find('i').removeClass('far').addClass('fas');
            }
        });
    }

    function handleLikeDislike(button) {
        const project = $(button).data('project');
        const isLike = $(button).hasClass('like-btn');
        const type = isLike ? 'like' : 'dislike';
        const oppositeType = isLike ? 'dislike' : 'like';
        const countElement = $(button).find('span');
        let count = parseInt(countElement.text());
        
        const alreadyVoted = localStorage.getItem(`${project}-voted`);
        
        if (alreadyVoted === type) {
            count--;
            localStorage.removeItem(`${project}-voted`);
            $(button).find('i').removeClass('fas').addClass('far');
        } else {
            if (alreadyVoted) {
                const oppositeButton = $(button).siblings(`.${oppositeType}-btn`);
                const oppositeCount = parseInt(oppositeButton.find('span').text());
                oppositeButton.find('span').text(oppositeCount - 1);
                oppositeButton.find('i').removeClass('fas').addClass('far');
            }
            
            count++;
            localStorage.setItem(`${project}-voted`, type);
            $(button).find('i').removeClass('far').addClass('fas');
        }
        
        countElement.text(count);
        localStorage.setItem(`${project}-${type}`, count);
    }

    // 2. Controle de Depoimentos
    function toggleTestimonials(show) {
        const animationSpeed = show ? 400 : 300;
        $('.more-testimonials').stop()[show ? 'slideDown' : 'slideUp'](animationSpeed);
        $('.show-less-container').toggle(show);
        $('.show-more-container').toggle(!show);
    }

    // 3. Inicialização
    function init() {
        initLikeButtons();
        
        // Event Listeners
        $('.like-btn, .dislike-btn').on('click', function() {
            handleLikeDislike(this);
        });

        $('#showMoreBtn').click(() => toggleTestimonials(true));
        $('#showLessBtn').click(() => toggleTestimonials(false));
    }

    // Inicia tudo
    init();
});