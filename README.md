# React usePaginateArray hook

## About usePaginateArray

usePaginateArray is a react hook which can accept an array of data and return a set of values and functions to handle a paginated table or other similar frontend display.

### usePaginateArray accepts an array and an integer for the number of results per page.

```jsx
import usePaginateArray from "../hooks/usePaginateArray";

const {
    setTargetPage,
    setNextPage,
    setPrevPage,
    paginatedArray,
    currentPage,
    totalPages,
    pageArray,
    currentRange,
} = usePaginateArray(myArrayOfData, 15);
```

| Property       | Usage                                                                                                          |
| -------------- | -------------------------------------------------------------------------------------------------------------- |
| setTargetPage  | Function, accepts an integer to jump to a specific page                                                        |
| setNextPage    | Function, moves to next page if possible                                                                       |
| setPrevPage    | Function, moves to previous page if possible                                                                   |
| paginatedArray | An array holding the values for the current page                                                               |
| currentPage    | An integer denoting the current page number                                                                    |
| totalPages     | An integer denoting the total number of pages                                                                  |
| pageArray      | An array of integers representing the total number of pages                                                    |
| currentRange   | An object with properties “from” and “to” to display the range of array elements contained in the current page |

## Example with React & Tailwind CSS

```jsx
<nav
    className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px"
    aria-label="Pagination"
>
    <button
        onClick={setPrevPage}
        className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
    >
        <span className="sr-only">Previous</span>
        <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
    </button>
    {pageArray.map((pageNumber, index) => (
        <button
            key={index}
            onClick={() => {
                setTargetPage(pageNumber);
            }}
            aria-current="page"
            className={classNames(
                pageNumber === currentPage
                    ? "z-10 bg-indigo-50 border-brand-purple text-brand-purple"
                    : "bg-white border-gray-300 text-gray-500 hover:bg-gray-50",
                "relative inline-flex items-center px-4 py-2 border text-sm font-medium"
            )}
        >
            {pageNumber}
        </button>
    ))}

    <button
        onClick={setNextPage}
        className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
    >
        <span className="sr-only">Next</span>
        <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
    </button>
</nav>
```
