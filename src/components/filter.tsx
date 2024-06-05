import React from 'react'
import AccountFilter from './account-filter'
import DateFilter from './date-filter'

function Filter() {
  return (
    <div className=' flex flex-col lg:flex-row items-center gap-y-2 lg:gap-y-0 lg:gap-x-2'>
        <AccountFilter/>
        <DateFilter/>
    </div>
  )
}

export default Filter