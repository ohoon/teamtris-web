function useCountDown(start: number) {
    function* countDown() {
        let num = start;
        while (num > 0) {
            yield num--;
        }
    }

    return countDown();
}

export default useCountDown;