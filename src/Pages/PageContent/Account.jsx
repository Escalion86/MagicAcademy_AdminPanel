import React, { useState } from 'react'
import axios from 'axios'
import InputMask from 'react-input-mask'
import Title from '../Components/Title'
import emailValidator from '../../helpers/emailValidator'
import DatePicker from 'react-datepicker'
import { registerLocale } from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { ru } from 'date-fns/locale'
registerLocale('ru', ru)

var minYear = 1900,
  maxYear = new Date().getFullYear()
var years = Array.apply(null, { length: maxYear + 1 - minYear }).map(function (
  _,
  idx
) {
  return idx + minYear
})
// function range(size, startAt = 0) {
//   return [...Array(size).keys()].map((i) => i + startAt)
// }

// const years = range(1990, new Date().getYear() + 1, 1)
// const years = [2000, 2001, 2002, 2003, 2004, 2005, 2006, 2007, 2008, 2009, 2010]

const months = [
  'Январь',
  'Февраль',
  'Март',
  'Апрель',
  'Май',
  'Июнь',
  'Июль',
  'Август',
  'Сентябрь',
  'Октябрь',
  'Ноябрь',
  'Декабрь',
]

const Input = ({
  type = 'input',
  className,
  stateParam,
  userState,
  setUserState,
  disabled = false,
}) => {
  return (
    <div className={className}>
      {type === 'phone' ? (
        <InputMask
          id="phone"
          mask="+7 (999) 999 9999"
          onChange={(e) => {
            const newState = []
            newState[stateParam] = e.target.value.replace(/[^\d]/g, '')
            setUserState({ ...userState, ...newState })
          }}
          value={userState[stateParam]}
          className="min-w-40 max-w-40 disabled:bg-gray-200 disabled:text-gray-600 disabled:cursor-not-allowed w-full rounded-md border border-gray-400 px-4 -mt-1 py-1 text-sm text-gray-900 placeholder-gray-500"
          disabled={disabled}
        />
      ) : type === 'sex' ? (
        <div className="min-w-40 max-w-100 flex gap-x-4 flex-wrap">
          <div className="radio">
            <label>
              <input
                className="m-2"
                type="radio"
                value="0"
                checked={userState.sex === '0'}
                onChange={() => setUserState({ ...userState, sex: '0' })}
              />
              Мужской
            </label>
          </div>
          <div className="radio">
            <label>
              <input
                className="m-2"
                type="radio"
                value="1"
                checked={userState.sex === '1'}
                onChange={() => setUserState({ ...userState, sex: '1' })}
              />
              Женский
            </label>
          </div>
        </div>
      ) : type === 'date' ? (
        <DatePicker
          renderCustomHeader={({
            date,
            changeYear,
            changeMonth,
            decreaseMonth,
            increaseMonth,
            prevMonthButtonDisabled,
            nextMonthButtonDisabled,
          }) => {
            return (
              <div className="flex justify-between mx-3">
                <button
                  className="w-6 align-middle border border-gray-300"
                  onClick={decreaseMonth}
                  disabled={prevMonthButtonDisabled}
                >
                  {'<'}
                </button>
                <select
                  className="w-16 align-middle border"
                  value={date.getFullYear()}
                  onChange={({ target: { value } }) => changeYear(value)}
                >
                  {years.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>

                <select
                  className="w-24 align-middle border"
                  value={months[date.getMonth()]}
                  onChange={({ target: { value } }) =>
                    changeMonth(months.indexOf(value))
                  }
                >
                  {months.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>

                <button
                  className="w-6 align-middle border border-gray-300"
                  onClick={increaseMonth}
                  disabled={nextMonthButtonDisabled}
                >
                  {'>'}
                </button>
              </div>
            )
          }}
          className="min-w-25 max-w-25 w-full rounded-md border border-gray-400 px-4 -mt-1 py-1 text-sm text-gray-900 placeholder-gray-500"
          selected={new Date(userState.birthday * 1000)}
          dateFormat="dd.MM.yyyy"
          locale="ru"
          onChange={(date) => {
            const birthday =
              (date.getTime() -
                date.getSeconds() * 1000 -
                date.getMinutes() * 1000 * 60 -
                date.getHours() * 1000 * 60 * 24) /
              1000
            setUserState({ ...userState, birthday })
          }}
        />
      ) : (
        <input
          className="min-w-40 max-w-100 w-full rounded-md border border-gray-400 px-4 -mt-1 py-1 text-sm text-gray-900 placeholder-gray-500"
          type="text"
          value={userState[stateParam]}
          onChange={(e) => {
            const newState = []
            newState[stateParam] = e.target.value
            setUserState({ ...userState, ...newState })
          }}
          disabled={disabled}
        />
      )}
    </div>
  )
}

const Item = ({
  type = 'input',
  name,
  stateParam,
  userState,
  setUserState,
  className,
  disabled,
}) => {
  return (
    <div className="w-full flex justify-between">
      <div className="min-w-32 w-32">{name}</div>
      <Input
        type={type}
        className={className}
        stateParam={stateParam}
        userState={userState}
        setUserState={setUserState}
        disabled={disabled}
      />
    </div>
  )
}

const compare = (obj1, obj2) => {
  return (
    obj1.phone === obj2.phone &&
    obj1.name === obj2.name &&
    obj1.email === obj2.email &&
    obj1.birthday === obj2.birthday &&
    obj1.sex === obj2.sex
  )
}

const Account = ({ user, setUser }) => {
  const [userState, setUserState] = useState(user)

  const userUpdate = () => {
    axios
      .post('http://magicacademyserver/userupdate.php', {
        phone: userState.phone,
        password: userState.passwordNoSecure, // Незашифрованый пароль
        name: userState.name,
        email: userState.email,
        birthday: userState.birthday,
        sex: userState.sex,
      })
      .then(function (response) {
        // console.log('response.data:', response.data)
        if (response.data?.error) console.error('user:', response.data)
        //setError(response.data.error)
        else {
          // Авторизация успешна, теперь проверяем есть ли аватарка на сервере и если нет то ставим стандартную
          const user = response.data.user
          setUser({ ...userState, ...user })
          // checkUrlExists(
          //   'src/img/avatars/' + user.id + '.jpg',
          //   function () {
          //     user.avatar = 'src/img/avatars/' + user.id + '.jpg'
          //     setUserState(user)
          //   },
          //   function () {
          //     user.avatar = user.sex
          //       ? 'src/img/avatars/male.jpg'
          //       : 'src/img/avatars/famale.jpg'
          //     setUserState(user)
          //   }
          // )
        }
      })
      .catch(function (error) {
        console.log('error: ', error)
      })
  }

  return (
    <>
      <Title text="Параметры учетной записи" />
      <div className="flex flex-col space-y-2">
        <Item
          type="phone"
          className="flex-1"
          name="Телефон (логин)"
          stateParam="phone"
          userState={userState}
          setUserState={setUserState}
          disabled
        />
        <Item
          type="input"
          className="flex-1"
          name="Имя"
          stateParam="name"
          userState={userState}
          setUserState={setUserState}
        />
        <Item
          type="email"
          className="flex-1"
          name="E-Mail"
          stateParam="email"
          userState={userState}
          setUserState={setUserState}
        />
        <Item
          type="date"
          className="flex-1"
          name="Дата рождения"
          stateParam="birthday"
          userState={userState}
          setUserState={setUserState}
        />
        <Item
          type="sex"
          className="flex-1"
          name="Пол"
          stateParam="sex"
          userState={userState}
          setUserState={setUserState}
        />
        <button
          name="send"
          className="ml-32 min-w-40 max-w-100 disabled:cursor-not-allowed disabled:opacity-40 bg-purple-600  hover:bg-purple-700 text-white font-bold py-2 rounded shadow-lg hover:shadow-xl transition duration-200"
          // type="submit"
          onClick={() => {
            // setUser(userState)
            userUpdate()
          }}
          disabled={compare(user, userState)}
        >
          Сохранить
        </button>
      </div>
    </>
  )
}

export default Account
