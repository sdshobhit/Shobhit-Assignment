import React from 'react';
import { useSelector } from 'react-redux';

const Dashboard = () => {
  const [users, setUsers] = React.useState([]);
  const [currUser, setCurrUser] = React.useState({});
  const { user } = useSelector(state => state.user);

  const fetchUsers = async () => {
    try {
      const res = await fetch('https://reqres.in/api/users?page=1&per_page=12');
      const data = await res.json();
      setUsers(data.data);
    } catch (err) {
      console.log(err);
    }
  };

  const findCurrUser = () => {
    const filterUser = users.find(item => item.email === user);
    setCurrUser(filterUser || {});
  };

  React.useEffect(() => {
    fetchUsers();
  }, []);

  React.useEffect(() => {
    findCurrUser();
  });

  return (
    <main className='flex flex-col justify-start items-center gap-5 mt-3 h-screen'>
      <section className="shadow-lg rounded-lg p-6 bg-white">
        {currUser && <img className='rounded-full' src={currUser.avatar} alt='profile' />}
        
        <section className='flex flex-col justify-center items-center gap-3'>
        <p className='font-semibold text-lg '>Id : {currUser.id}</p>
          <p className='font-semibold text-lg'>First Name : {currUser.first_name}</p>
          <p className='font-semibold text-lg'>Last Name : {currUser.last_name}</p>
          <p className='font-semibold text-lg'>Full  Name : {currUser.first_name+currUser.first_name}</p>
          <p className='font-semibold text-lg'>Email : {currUser.email}</p>
        </section>
      </section>
    </main>
  );
};

export default Dashboard;
