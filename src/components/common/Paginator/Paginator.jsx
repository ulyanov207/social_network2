import React, {useState} from 'react';
import styles from "./Paginator.module.css";
import cn from "classnames"

const Paginator = (totalItemsCount, pageSize, currentPage, onPageChanged, portionSize = 10) => {

    let pagesCount = Math.ceil(totalItemsCount / pageSize)

    let pages = []
    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i);
    }

    let portionCount = Math.ceil(pagesCount / pageSize)
    let [portionNumber, setPortionNumber] = useState(1)
    let leftPortionPageNumber = (portionNumber - 1) * portionSize + 1
    let rightPotionPageNumber = portionNumber * portionSize

    return <div className={styles.paginator}>
        portionNumber > 1 &&
        <button onClick={() => {setPortionNumber(portionNumber - 1)}}>PREV</button>}
        {pages
            .filter(p => p >= leftPortionPageNumber && p<=rightPotionPageNumber)
            .map(p => {
            return <span className={ cn({
                [styles.selectPage]: currentPage === p
            }, styles.pageNumber)}
                         key={p}
                         onClick={(e) => {
                             onPageChanged(p)
                         }}>{p}</span>
        })}
        {portionCount > portionNumber &&
        <button onClick={() => {setPortionNumber(portionNumber + 1)}}>NEXT</button>}
    </div>
}

export default Paginator;