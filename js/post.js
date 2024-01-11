// На странице post-details.html:
// 7 Вивести всю, без виключення, інформацію про об'єкт post на який клікнули .
// 8 Нижчє інформаці про пост, вивести всі коментарі поточного поста (ендпоінт  - https://jsonplaceholder.typicode.com/posts/POST_ID/comments

let urlSearch = new URLSearchParams(window.location.search);
let idPost = urlSearch.get(`ID`);
console.log(idPost);
let userId = localStorage.getItem('UserId');
console.log(userId);
let mainPostInfo = document.createElement('div');
mainPostInfo.classList.add('main_post_info')
let postInfo = document.getElementById('post_info');
let postComment = document.getElementById('post_comments');


fetch(`https://jsonplaceholder.typicode.com/posts/${idPost}`)
    .then(value => value.json())
    .then(posts => {
        console.log(posts)
        for (const key in posts) {
            let postPar = document.createElement('p');
            postPar.classList.add('par_user')
            let keys = key.toUpperCase()
            postPar.innerText = `${keys}: ${JSON.stringify(posts[key])}`;
            postInfo.appendChild(postPar);
            document.body.appendChild(postInfo);
        }
        fetch(`https://jsonplaceholder.typicode.com/posts/${idPost}/comments`)
            .then(value => value.json())
            .then(comment => {
                console.log(comment);
                for (const commentElement of comment) {
                    let blockComment = document.createElement('div');
                    blockComment.classList.add('block_comment');
                    let parPostID = document.createElement('p');
                    parPostID.classList.add('par');
                    let parID = document.createElement('p');
                    parID.classList.add('par_ID');
                    let parEmail = document.createElement('p');
                    parEmail.classList.add('par');
                    let parName = document.createElement('p');
                    parName.classList.add('par');
                    let parBody = document.createElement('p');
                    parBody.classList.add('par');
                    parPostID.innerText = `Post ID: ${commentElement.postId}`;
                    parID.innerText = `Comment: ${commentElement.id}`;
                    parEmail.innerText = `Email: ${commentElement.email}`;
                    parName.innerText = `Name: ${commentElement.name}`;
                    parBody.innerText = `${commentElement.body}`;
                    blockComment.append(parID, parPostID, parName, parEmail, parBody);
                    postComment.append(blockComment);

                }

            })
        let buttonBackTitle = document.createElement('button');
        buttonBackTitle.classList.add('button_back_title')
        buttonBackTitle.innerText = 'BACK';
        buttonBackTitle.addEventListener('click', () => {
            window.location.href = `details-user.html?userID=${userId}`;
        });

        postInfo.append(buttonBackTitle);
        mainPostInfo.append(postInfo, postComment);
        document.body.appendChild(mainPostInfo);
    });

