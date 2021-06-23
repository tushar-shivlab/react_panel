import { useEffect, useState } from 'react';
import Profile from '../../assets/image/download.jpeg';

import Cookies from 'universal-cookie';
const cookies = new Cookies();

const groupId = cookies.get('groupId');

function UserList({ group, socket }) {
    const [usergroup, setusergroup] = useState([]);

    useEffect(() => {
        setusergroup(group);
    }, [group]);

    useEffect(() => {
        const newarr = [...usergroup];
        socket.on(groupId, function (data) {
            console.log('data :>> ', data);
            newarr.push(data);
            console.log('newarr :>> ', newarr);
            setusergroup(newarr);
        });
        return () => {
            socket.off(groupId);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    let i = 1;
    console.log('usergroup :>> ', usergroup);

    return (
        <ul className="list bg-gray-500">
            {usergroup?.length &&
                usergroup?.map((users) => {
                    return (
                        <li
                            key={users._id}
                            className="inline-block shadow-lg p-3 m-2 bg-green-300">
                            <div className="w-12 float-left text-center p-2">
                                {i++}
                            </div>
                            <div className="w-25 float-left pl-5 w-20 opacity-1">
                                <p>{users.name}</p>
                                <p>Point 0</p>
                            </div>
                            <div className="w-18 float-left pl-5">
                                <img
                                    className="h-12 float-left"
                                    src={Profile}
                                    alt="demo"
                                />
                            </div>
                        </li>
                    );
                })}
        </ul>
    );
}
export default UserList;
