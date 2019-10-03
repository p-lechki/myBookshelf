'use strict';

function titleClickHandler(event) {
  event.preventDefault();
  const clickedElement = this;
  // console.log('Link was clicked!');
  // console.log(event);

  /* remove class 'active' from all article links  */
  const activeLinks = document.querySelectorAll('.titles a.active');

  for (let activeLink of activeLinks) {
    activeLink.classList.remove('active');
  }

  /* add class 'active' to the clicked link */
  // console.log('clickedElement:', clickedElement);
  clickedElement.classList.add('active');

  /* remove class 'active' from all articles */
  const activeArticles = document.querySelectorAll('.posts .active');

  for (let activeArticle of activeArticles) {
    activeArticle.classList.remove('active');
  }

  /* get 'href' attribute from the clicked link */
  const articleHref = clickedElement.getAttribute("href");
  // alert(articleHref);
  // console.log(articleHref);
  /* find the correct article using the selector (value of 'href' attribute) */
  const clickedArticle = document.querySelector(articleHref);
  // console.log(clickedArticle);
  /* add class 'active' to the correct article */
  clickedArticle.classList.add('active');
}


const optArticleSelector = '.post',
  optTitleSelector = '.post-title',
  optTitleListSelector = '.titles',
  optArticleTagsSelector = '.post-tags .list',
  optArticleAuthorSelector = '.post-author';

function generateTitleLinks(customSelector = '') {

  /* remove contents of titleList */
  const titleList = document.querySelector(optTitleListSelector);
  titleList.innerHTML = '';
  let html = '';
  /* for each article */


  const articles = document.querySelectorAll(optArticleSelector + customSelector);
  for (let article of articles) {
    // let html = '';
    /* get the article id */
    const articleId = article.getAttribute("id");
    // console.log(articleId);

    /* find the title element */

    /* get the title from the title element */
    const articleTitle = article.querySelector(optTitleSelector).innerHTML;
    // console.log(articleTitle);

    /* create HTML of the link */
    const linkHTML = '<li><a href="#' + articleId + '"><span>' + articleTitle + '</span></a></li>';
    // console.log(linkHTML);
    /* insert link into titleList */
    // titleList.innerHTML = titleList.innerHTML + linkHTML;
    // titleList.insertAdjacentHTML('beforeend', linkHTML);
    html = html + linkHTML;
    // console.log(html);
  }
  titleList.innerHTML = html;

  const links = document.querySelectorAll('.titles a');

  for (let link of links) {
    link.addEventListener('click', titleClickHandler);
  }
}

generateTitleLinks();

function generateTags() {
  /* find all articles */
  const articles = document.querySelectorAll(optArticleSelector);
  /* START LOOP: for every article: */
  for (let article of articles) {
    /* find tags wrapper */
    const tagsList = article.querySelector(optArticleTagsSelector);
    console.log(tagsList);
    tagsList.innerHTML = '';
    /* make html variable with empty string */
    let html = '';
    /* get tags from data-tags attribute */
    const articleTags = article.getAttribute("data-tags");
    console.log(articleTags);
    /* split tags into array */
    const articleTagsArray = articleTags.split(' ');
    console.log(articleTagsArray);
    /* START LOOP: for each tag */
    for (let tag of articleTagsArray) {
      console.log(tag);

      /* generate HTML of the link */
      const tagHTML = '<li><a href="#tag-' + tag + '">' + tag + '</a></li>';
      /* add generated code to html variable */
      html += tagHTML;
      console.log(html);
      /* END LOOP: for each tag */
    }
    /* insert HTML of all the links into the tags wrapper */
    tagsList.innerHTML = html;
    /* END LOOP: for every article: */
  }
}

generateTags();

function tagClickHandler(event) {
  /* prevent default action for this event */
  event.preventDefault();
  /* make new constant named "clickedElement" and give it the value of "this" */
  const clickedElement = this;
  /* make a new constant "href" and read the attribute "href" of the clicked element */
  const href = clickedElement.getAttribute("href");
  console.log(href);
  /* make a new constant "tag" and extract tag from the "href" constant */
  const tag = href.replace('#tag-', '');
  console.log(tag);
  /* find all tag links with class active */
  const tags = document.querySelectorAll('a.active[href^="#tag-"]');
  console.log(tags);
  /* START LOOP: for each active tag link */
  for (let tag of tags) {
    /* remove class active */
    tag.classList.remove('active');
    /* END LOOP: for each active tag link */
  }
  /* find all tag links with "href" attribute equal to the "href" constant */
  const activeTags = document.querySelectorAll('a[href="' + href + '"]');
  console.log(activeTags);
  /* START LOOP: for each found tag link */
  for (let activeTag of activeTags) {
    /* add class active */
    activeTag.classList.add('active');
    /* END LOOP: for each found tag link */
  }
  /* execute function "generateTitleLinks" with article selector as argument */
  generateTitleLinks('[data-tags~="' + tag + '"]');
}

function addClickListenersToTags() {
  /* find all links to tags */
  const clickedTags = document.querySelectorAll('a[href^="#tag-"');
  /* START LOOP: for each link */
  for (let clickedTag of clickedTags) {
    /* add tagClickHandler as event listener for that link */
    clickedTag.addEventListener('click', tagClickHandler);
    /* END LOOP: for each link */
  }
}

addClickListenersToTags();

function generateAuthors() {
  /* find all articles */
  const articles = document.querySelectorAll(optArticleSelector);
  /* START LOOP: for every article: */
  for (let article of articles) {
    /* find authors wrapper */
    const author = article.querySelector(optArticleAuthorSelector);
    console.log(author);
    author.innerHTML = '';
    /* make html variable with empty string */
    let html = '';
    /* get tags from data-author attribute */
    const articleAuthor = article.getAttribute("data-author");
    console.log(articleAuthor);

    /* generate HTML of the link */
    const tagHTML = '<a href="#author-' + articleAuthor + '">by ' + articleAuthor + '</a>';
    /* add generated code to html variable */
    html += tagHTML;
    console.log(html);
    /* insert HTML of all the links into the tags wrapper */
    author.innerHTML = html;
    /* END LOOP: for every article: */
  }
}

generateAuthors();

function authorClickHandler(event) {
  /* prevent default action for this event */
  event.preventDefault();
  /* make new constant named "clickedElement" and give it the value of "this" */
  const clickedElement = this;
  /* make a new constant "href" and read the attribute "href" of the clicked element */
  const href = clickedElement.getAttribute("href");
  console.log(href);
  /* make a new constant "tag" and extract tag from the "href" constant */
  const author = href.replace('#author-', '');
  console.log(author);
  /* find all author links with class active */
  const authors = document.querySelectorAll('a.active[href^="#author-"]');
  console.log(authors);
  /* START LOOP: for each active tag link */
  for (let author of authors) {
    /* remove class active */
    author.classList.remove('active');
    /* END LOOP: for each active tag link */
  }
  /* find all tag links with "href" attribute equal to the "href" constant */
  const activeAuthors = document.querySelectorAll('a[href="' + href + '"]');
  console.log(activeAuthors);
  /* START LOOP: for each found tag link */
  for (let activeAuthor of activeAuthors) {
    /* add class active */
    activeAuthor.classList.add('active');
    /* END LOOP: for each found tag link */
  }
  /* execute function "generateTitleLinks" with article selector as argument */
  generateTitleLinks('[data-author="' + author + '"]');
}

function addClickListenersToAuthors() {
  /* find all links to tags */
  const clickedAuthors = document.querySelectorAll('a[href^="#author-"');
  /* START LOOP: for each link */
  for (let clickedAuthor of clickedAuthors) {
    /* add tagClickHandler as event listener for that link */
    clickedAuthor.addEventListener('click', authorClickHandler);
    /* END LOOP: for each link */
  }
}

addClickListenersToAuthors();
