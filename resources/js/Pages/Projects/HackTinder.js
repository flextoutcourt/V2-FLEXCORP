const fetchUsers = async () => {
    const users = await fetch(`https://api.gotinder.com/fast-match/teasers`, {
        "headers": {
            "X-Auth-Token": localStorage.getItem('TinderWeb/APIToken')
        },
        'method': 'POST',
    })
        .then(response => response.json())
        .then(res => res.data.results);
    return getUserDetails(user.id);
}

const getUserDetail = async id => {
    const user = await fetch(`https://api.gotinder.com/user/${id}`, {
        'headers': {
            'X-Auth-Token': localStorage.getItem('TinderWeb/APIToken')
        },
        method: 'POST'
    })
        .then(response => response.json())
        .then(response => response.data.results);
    return user;
}

const storeUserPictures = async id => {
    await fetch('https://dev.quentinleclerc.fr/tinder/pictures/store', {
        "headers": {
            'APIToken': 'BYPASSFLEX'
        },
        method: 'POST'
    })
        .then(response => response.json())
        .then(res => alert(res.code));
}
