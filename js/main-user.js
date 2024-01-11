// 4 Вивести всю, без виключення, інформацію про об'єкт user на який клікнули
// 5 Додати кнопку "post of current user", при кліку на яку, з'являються title всіх постів поточного юзера
// (для получения постов используйте эндпоинт https://jsonplaceholder.typicode.com/users/USER_ID/posts)
//     6 Каждому посту додати кнопку/посилання, при кліку на яку відбувається перехід на сторінку post-details.html, котра має детальну інфу про поточний пост.


let url = new URLSearchParams(window.location.search);
let userId = url.get('userID');

let mainInfoAut = document.createElement(`div`);
mainInfoAut.classList.add("main_info_aut");
fetch(`https://jsonplaceholder.typicode.com/users/${userId}`)
    .then(value => value.json())
    .then(user => {
        console.log(user);
        let div = document.getElementById('info_user');
        for (const key in user) {
            let p = document.createElement('p');
            p.classList.add("par_info");
            p.innerText = `${key}: ${JSON.stringify(user[key])}`;
            div.appendChild(p);
            mainInfoAut.appendChild(div);

        }
        let buttonBlock = document.createElement('div');
        buttonBlock.classList.add('button_block');
        let button = document.createElement('button');
        button.innerText = 'Post of current user';
        button.classList.add('button_next');
        let buttonBack = document.createElement('button');
        buttonBack.classList.add('button_back');
        buttonBack.innerText = 'BACK';
        buttonBack.addEventListener('click', () => {
            window.location.href = 'index.html';
        })
        let postBlock = document.createElement('div');
        postBlock.classList.add('post_block');
        button.addEventListener('click', () => {
            fetch(`https://jsonplaceholder.typicode.com/users/${userId}/posts`)
                .then(response => response.json())
                .then(posts => {
                    mainInfoAut.innerText = '';
                    posts.forEach(post => {
                        let postDiv = document.createElement('div');
                        postDiv.classList.add('post_div');
                        let pTitle = document.createElement('p');
                        pTitle.classList.add('post_title');
                        let buttonSearchPost = document.createElement('button');
                        buttonSearchPost.classList.add('button_search_post');
                        let title = `${post.title}`;
                        let upTitle = title.toUpperCase();
                        console.log(upTitle);
                        pTitle.innerText = `Title: ${upTitle}`;
                        buttonSearchPost.innerText = 'View Post Details';
                        buttonSearchPost.addEventListener('click', () => {
                            window.location.href = `post-details.html?ID=${post.id}`;
                        })

                        postDiv.append(pTitle, buttonSearchPost);
                        postBlock.append(postDiv);
                        mainInfoAut.append(postBlock);
                        document.body.appendChild(mainInfoAut);
                    });
                    let divButtonBack = document.createElement('div');
                    let buttonBackUser = document.createElement('button');
                    buttonBackUser.classList.add(`button_back_user`);
                    buttonBackUser.innerText = 'BACK';
                    buttonBackUser.addEventListener('click', () => {
                        window.location.href = `details-user.html?userID=${user.id}`;
                    })
                    divButtonBack.classList.add('button');
                    divButtonBack.append(buttonBackUser);
                    mainInfoAut.append(divButtonBack);
                    document.body.appendChild(mainInfoAut);

                })
        });

        buttonBlock.append(buttonBack, button);
        mainInfoAut.append(div, buttonBlock )
        document.body.appendChild(mainInfoAut);

    })
localStorage.setItem('UserId', `${userId}`)
