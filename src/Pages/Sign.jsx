import React, { useState } from 'react'
import axios from 'axios'

const Sign = ({ user, setUserState }) => {
  const [error, setError] = useState('')
  const [phone, setPhone] = useState('79138370020')
  const [password, setPassword] = useState('123')

  const SignIn = () => {
    axios
      .post('http://magicacademyserver/signin.php', {
        phone,
        password,
      })
      .then(function (response) {
        console.log('response: ', response)
        if (response.data?.error) setError(response.data.error)
        else setUserState(response.data)
      })
      .catch(function (error) {
        console.log('error: ', error)
      })
  }

  return (
    <div
      className="min-h-screen pt-12 md:pt-20 pb-6 px-2 md:px-0"
      style={{
        backgroundColor: '#9921e8',
        backgroundImage: 'linear-gradient(315deg, #9921e8 0%, #5f72be 74%)',
      }}
      // style="font-family: 'Lato', sans-serif"
    >
      <header className="max-w-lg mx-auto">
        <a href="#">
          <h1 className="text-4xl font-bold text-white text-center">
            Академия Юных Волшебников
          </h1>
        </a>
      </header>

      <main className="bg-white max-w-lg mx-auto p-8 md:p-12 my-10 rounded-lg shadow-2xl">
        <section>
          <h3 className="font-bold text-2xl">Вход в личный кабинет</h3>
        </section>

        <section className="mt-10">
          <div className="flex flex-col">
            <div className="mb-6 pt-3 rounded bg-gray-200">
              <label
                className="block text-gray-700 text-sm font-bold mb-2 ml-3"
                htmlFor="phone"
              >
                Телефон
              </label>
              <input
                name="phone"
                type="text"
                id="phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="bg-gray-200 rounded w-full text-gray-700 focus:outline-none border-b-4 border-gray-300 focus:border-purple-600 transition duration-500 px-3 pb-3"
              />
            </div>
            <div className="mb-6 pt-3 rounded bg-gray-200">
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
            {error && (
              <span className="text-sm font-bold text-red-700">{error}</span>
            )}
            <div className="flex justify-end">
              <a
                href="#"
                className="text-sm text-purple-600 hover:text-purple-700 hover:underline mb-6"
              >
                Забыли пароль?
              </a>
            </div>
            <button
              name="send"
              className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 rounded shadow-lg hover:shadow-xl transition duration-200"
              // type="submit"
              onClick={SignIn}
            >
              Вход
            </button>
          </div>
        </section>
      </main>

      <div className="max-w-lg mx-auto text-center mt-12 mb-6">
        <p className="text-white">
          Не зарегистрированы?{' '}
          <a href="#" className="font-bold hover:underline">
            Регистрация
          </a>
          .
        </p>
      </div>

      <footer className="max-w-lg mx-auto flex justify-center text-white">
        <a href="#" className="hover:underline">
          Контакты
        </a>
        <span className="mx-3">•</span>
        <a href="#" className="hover:underline">
          Политики конфиденциальности
        </a>
      </footer>
    </div>
  )
}

export default Sign
