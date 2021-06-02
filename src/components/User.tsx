import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useState } from 'react';

export interface Props {}

type Inputs = {
  files: FileList;
};

const list = [
  {
    name: 'this is my first cv',
    status: 'sent',
  },
];

const User = () => {
  const [cards, setCards] = useState(list);
  const { register, watch } = useForm<Inputs>();

  watch(({ files }) => {
    console.log(files);

    if (files.length === 0) return;

    const name = files[0].name;
    const fileExist = cards.some((card) => card.name === name);
    if (!fileExist) setCards([{ name, status: 'sent' }, ...cards]);
  });

  return (
    <Div>
      <nav className='user-nav'>
        <ul className='user-nav-ul'>
          <li className='user-nav-li'>
            <Link className='user-nav-link' to='/'>
              Logout
            </Link>
          </li>
        </ul>
      </nav>
      <div className='user-cv-container'>
        <h2>My CVs</h2>
        <div className='user-cv-card-container'>
          {cards.map((card, ind) => (
            <div className='user-cv-card' key={ind}>
              <h5 className='user-cv-card-title'>{card.name}</h5>

              <span>{card.status}</span>

              <button className='user-cv-card-button btn btn-primary'>
                Update
              </button>
            </div>
          ))}
        </div>
        <div className='user-cv-buttons'>
          <form>
            <input
              type='file'
              {...register('files')}
              className='user-cv-add btn btn-primary'
            />
          </form>
        </div>
      </div>
    </Div>
  );
};

const Div = styled.div`
  min-height: 100vh;

  display: flex;
  flex-direction: column;
  align-items: center;

  .user-nav {
    display: flex;
    align-items: center;
    background-color: #023e8a;
    width: 100%;
  }
  .user-nav-ul {
    display: flex;
    list-style-type: none;
    align-items: center;
    transform: translateY(25%) translateX(30%);
  }
  .user-nav-li {
    background: white;
    padding: 3px 6px;
    border-radius: 6px;
  }
  .user-nav-link {
    color: red;
    text-decoration: none;
  }

  .user-cv-container {
    margin-top: 2rem;
    width: max(80%, 300px);
    height: 500px;
    background: #0a9396;
    border-radius: 15px;
    border-bottom: 6px solid gray;
  }

  .user-cv-card-container {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 10px;
    height: 80%;
    margin: 8px;
    background-color: white;
    padding: 5px;
    overflow: auto;
  }
  .user-cv-card {
    flex-basis: calc(calc(600px - 100%) * 999);
    height: 150px;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    border-radius: 7px;
    background: #94d2bd;
    padding: 8px;
  }
  .user-cv-card-title {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    width: 250px;
  }
  .user-cv-add {
    width: 80%;
  }
  .user-cv-buttons {
    display: flex;
    justify-content: center;
  }
`;

export default User;
