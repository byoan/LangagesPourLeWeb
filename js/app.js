// L'évènement DOMContentLoaded est émit lorsque le DOM a été chargé par le navigateur, sur tous les navigateurs récents (>= IE 11)
document.addEventListener("DOMContentLoaded", function (event) {
    assignListenersToLinks();
});

function assignListenersToLinks() {
    let relatedArticlesList = document.querySelectorAll('#relatedArticles a');
    // Nous sommes ici obligés de faire une boucle car la méthode querySelectorAll renvoie un tableau, du aux multiples éléments portant l'identifiant demandé
    for (var i = 0; i < relatedArticlesList.length; i++) {
        // On ajoute un listener du click sur ces éléments, et on lui fournit en callback (méthode à appeler lors de cet évènement) la fonction handleClick
        relatedArticlesList[i].addEventListener('click', handleClick, false);
    }
}

function handleClick(clickEvent) {
    // Cette méthode permet d'éviter le comportement classique de navigateur lors du clic sur un lien vers une URL #, à savoir de remonter en haut de page
    clickEvent.preventDefault();
    let idPageToLoad = parseInt(clickEvent.target.id);

    $.ajax({
        // Concaténation du numéro de fiche à récupérer
        url: 'fiche' + idPageToLoad + '.json',
        type: 'GET',
        success: function (response) {
            let newPageContent = response;
            $('title').text(newPageContent.pageTitle);
            $('article').html(newPageContent.content);
            assignListenersToLinks();
        },
        error: function (response) {
            alert('Une erreur s\'est produite lors de la récupération du contenu de la fiche demandée : ' + response);
        }
    });
}
