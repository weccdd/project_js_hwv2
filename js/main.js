// 1 отримати масив об'єктів з endpoint`а https://jsonplaceholder.typicode.com/users
// 2 Вивести id,name всіх user в index.html. Окремий блок для кожного user.
// 3 Додати кожному блоку кнопку/посилання , при кліку на яку відбувається перехід  на сторінку user-details.html, котра має детальну інфорацію про об'єкт на який клікнули


let url = new URL('https://jsonplaceholder.typicode.com/users');
let mainBlockInfoUsers  = document.createElement("div")
mainBlockInfoUsers.classList.add(`main_block_info_users`)
fetch(url)
    .then(value => value.json())
    .then(posts => {
        console.log(posts)
        let div = document.getElementById('info_users')
        for (const postElement of posts) {
            let pID = document.createElement('p')
            pID.classList.add('post_info_id')
            let pName = document.createElement('p')
            pName.classList.add('post_info_name')
            let divInfo = document.createElement('div')
            divInfo.classList.add('info_user')
            let btn = document.createElement('button')
            btn.classList.add('btn_details')
            let btnDel = document.createElement('button')
            btnDel.classList.add('btn_del')

            pID.innerText = `ID: ${postElement.id}`
            pName.innerText = `Name: ${postElement.name}`
            btn.innerText = 'DETAILS'
            btnDel.innerText = 'DELETE'

            divInfo.append(pID, pName , btn, btnDel)
            div.append(divInfo)
            mainBlockInfoUsers.append(div)
            document.body.appendChild(mainBlockInfoUsers)

            btn.addEventListener('click', () =>
                document.location.href = `details-user.html?userID=${postElement.id}`
            )
            btnDel.addEventListener('click', () => {
                pID.style.display = 'none';
                pName.style.display = 'none';
                btn.style.display = 'none';
                btnDel.style.display = 'none';
            })


        }
    })
