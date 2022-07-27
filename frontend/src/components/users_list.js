import React from 'react';
import {Link} from "react-router-dom";

const UserItem = ({user}) => {
    return (
        <tr>
            <td>
                {user.id}
            </td>

            <td>
                {user.username}
            </td>

            <td>
                {user.first_name}
            </td>

            <td>
                {user.last_name}
            </td>

            <td>
                {user.email}
            </td>
        </tr>
    )
}

const UserList = ({users}) => {
    return (
        <table class="data">
            <th>id</th>
            <th>логин</th>
            <th>имя</th>
            <th>фамилия</th>
            <th>email</th>
            {users.map((cur_user) => <UserItem user={cur_user} />
            )}
        </table>
    )
}

export default UserList
