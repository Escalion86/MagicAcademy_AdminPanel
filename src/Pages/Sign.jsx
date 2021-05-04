import React, { useState } from 'react'
import axios from 'axios'
import checkUrlExists from '../helpers/checkUrlExists'
import InputMask from 'react-input-mask'

import Logo from '../img/HeadLogo.png'

const Sign = ({ user, setUserState }) => {
  const [error, setError] = useState('')
  const [phone, setPhone] = useState('79138370020')
  const [password, setPassword] = useState('123')
  const [smsCode, setSmsCode] = useState('')
  const [passwordRepeat, setPasswordRepeat] = useState('')
  const [registration, setRegistration] = useState(false)
  const [registrationPhase, setRegistrationPhase] = useState(0)

  const SignIn = () => {
    axios
      .post('http://magicacademyserver/signin.php', {
        phone,
        password,
      })
      .then(function (response) {
        console.log('user:', response.data?.user)
        if (response.data?.error) setError(response.data.error)
        else {
          // Авторизация успешна, теперь проверяем есть ли аватарка на сервере и если нет то ставим стандартную
          const user = response.data.user
          checkUrlExists(
            'src/img/avatars/' + user.id + '.jpg',
            function () {
              user.avatar = 'src/img/avatars/' + user.id + '.jpg'
              setUserState(user)
            },
            function () {
              user.avatar = user.sex
                ? 'src/img/avatars/male.jpg'
                : 'src/img/avatars/famale.jpg'
              setUserState(user)
            }
          )
          // if (checkUrlExists('src/img/avatars/' + user.id + '.jpg')) {
          //   user.avatar = 'src/img/avatars/' + user.id + '.jpg'
          //   setUserState(user)
          // } else {
          //   user.avatar = user.sex
          //     ? 'src/img/avatars/male.jpg'
          //     : 'src/img/avatars/famale.jpg'
          //   setUserState(user)
          // }
        }
      })
      .catch(function (error) {
        console.log('error: ', error)
      })
  }

  const Register = () => {
    if (registrationPhase === 2 && password !== passwordRepeat) {
      setError('Пароли не совпадают')
    } else {
      axios
        .post('http://magicacademyserver/register.php', {
          phone,
          password,
          phase: registrationPhase,
          smscode: smsCode,
        })
        .then(function (response) {
          console.log('response: ', response)
          if (response.data?.error) setError(response.data.error)
          else {
            if (registrationPhase === 0) {
              // На телефон выслан код
              setRegistrationPhase(1)
            } else if (registrationPhase === 1) {
              // Код верен
              setRegistrationPhase(2)
            } else if (registrationPhase === 2) SignIn() // Регистрация успешна
          }
        })
        .catch(function (error) {
          console.log('error: ', error)
        })
    }
  }

  return (
    <div
      className="min-h-screen pt-10 md:pt-16 pb-6 px-2 md:px-0"
      style={{
        backgroundColor: '#9921e8',
        backgroundImage: 'linear-gradient(315deg, #9921e8 0%, #5f72be 74%)',
      }}
      // style="font-family: 'Lato', sans-serif"
    >
      {/* <header className="max-w-lg mx-auto">
        <a href="#">
          <h1 className="text-4xl font-bold text-white text-center">
            Академия Юных Волшебников
          </h1>
        </a>
      </header> */}

      <main className="bg-white max-w-lg mx-auto p-8 md:p-12 my-10 rounded-lg shadow-2xl">
        <section className="flex flex-col items-center">
          <img className="" src={Logo} alt="logo" />
          <h3 className="font-bold text-2xl mt-2">
            {!registration ? 'Вход в личный кабинет' : 'Регистрация'}
          </h3>
        </section>

        <section className="mt-2">
          <div className="flex flex-col">
            <div className="mb-4 pt-3 rounded bg-gray-200">
              <label
                className="block text-gray-700 text-sm font-bold mb-2 ml-3"
                htmlFor="phone"
              >
                Телефон
              </label>
              <InputMask
                id="phone"
                mask="+7 (999) 999 9999"
                onChange={(e) => setPhone(e.target.value.replace(/[^\d]/g, ''))}
                value={phone}
                className="bg-gray-200 rounded w-full text-gray-700 focus:outline-none border-b-4 border-gray-300 focus:border-purple-600 transition duration-500 px-3 pb-3"
              />
              {/* <input
                name="phone"
                type="text"
                id="phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="bg-gray-200 rounded w-full text-gray-700 focus:outline-none border-b-4 border-gray-300 focus:border-purple-600 transition duration-500 px-3 pb-3"
              /> */}
            </div>
            {registrationPhase >= 1 && (
              <div className="mb-4 pt-3 rounded bg-gray-200">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2 ml-3"
                  htmlFor="smscode"
                >
                  Код из смс
                </label>
                <input
                  disabled={registrationPhase !== 1}
                  name="smscode"
                  // type="password"
                  id="smscode"
                  value={smsCode}
                  onChange={(e) => setSmsCode(e.target.value)}
                  className="bg-gray-200 rounded w-full text-gray-700 focus:outline-none border-b-4 border-gray-300 focus:border-purple-600 transition duration-500 px-3 pb-3"
                />
              </div>
            )}
            {(!registration || registrationPhase === 2) && (
              <>
                <div className="mb-4 pt-3 rounded bg-gray-200">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2 ml-3"
                    htmlFor="password"
                  >
                    Пароль
                  </label>
                  <input
                    name="password"
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="bg-gray-200 rounded w-full text-gray-700 focus:outline-none border-b-4 border-gray-300 focus:border-purple-600 transition duration-500 px-3 pb-3"
                  />
                </div>
                {registration && (
                  <div className="mb-4 pt-3 rounded bg-gray-200">
                    <label
                      className="block text-gray-700 text-sm font-bold mb-2 ml-3"
                      htmlFor="passwordrepeat"
                    >
                      Пароль повторно
                    </label>
                    <input
                      name="passwordrepeat"
                      type="password"
                      id="passwordrepeat"
                      value={passwordRepeat}
                      onChange={(e) => setPasswordRepeat(e.target.value)}
                      className="bg-gray-200 rounded w-full text-gray-700 focus:outline-none border-b-4 border-gray-300 focus:border-purple-600 transition duration-500 px-3 pb-3"
                    />
                  </div>
                )}
              </>
            )}
            {error && (
              <span className="text-sm font-bold text-red-700  mb-4">
                {error}
              </span>
            )}
            {!registration && (
              <div className="flex justify-end">
                <a
                  href="#"
                  className="text-sm text-purple-600 hover:text-purple-700 hover:underline mb-4"
                >
                  Забыли пароль?
                </a>
              </div>
            )}
            <button
              name="send"
              className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 rounded shadow-lg hover:shadow-xl transition duration-200"
              // type="submit"
              onClick={registration ? Register : SignIn}
            >
              {registration ? 'Зарегистрироваться' : 'Вход'}
            </button>
          </div>
        </section>
      </main>

      <div className="max-w-lg mx-auto text-center mt-12 mb-6">
        <p className="text-white">
          {!registration ? (
            <>
              Не зарегистрированы?{' '}
              <a
                className="cursor-pointer font-bold hover:underline"
                onClick={() => {
                  setRegistration(true)
                  setError('')
                }}
              >
                Регистрация
              </a>
              .
            </>
          ) : (
            <>
              Уже зарегистрированы?{' '}
              <a
                className="cursor-pointer font-bold hover:underline"
                onClick={() => {
                  setRegistration(false)
                  setError('')
                }}
              >
                Вход в личный кабинет
              </a>
              .
            </>
          )}
        </p>
      </div>

      <footer className="max-w-lg mx-auto flex justify-center text-white">
        {/* <a href="#" className="hover:underline">
          Контакты
        </a> */}
        {/* <span className="mx-3">•</span> */}
        <a href="#" className="hover:underline">
          Политика конфиденциальности
        </a>
      </footer>
    </div>
  )
}

export default Sign
