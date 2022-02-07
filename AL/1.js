//评测题目: 无

/**
 * 数组[ 'a/b', 'b/c/', 'h/a/e']  ，表示一个完整的目录结构下的子路径，实现一个方法找到这个目录的根节点。
 *
 */

// [
//   { key: a, pre: h, next: b },
//   { key: b, pre: a, next: null },
//   { key: c, pre: b, next: null },
// ];

const parse = function (array) {
  return array
    .reduce((pre, curr) => {
      const currArray = curr.split("/");
      currArray.forEach((el, index) => {
        console.log(el)
        let matFlag = false;
        pre.forEach((item) => {
          if (item.key == el) {
            item.pre = currArray[index - 1];
            item.next = currArray[index + 1];
            matFlag = true;
          }
        });
        console.log(matFlag)
        if (!matFlag) {
          pre.push({
            key: el,
            pre: currArray[index - 1],
            next: currArray[index + 1],
          });
          matFlag = true;
        }
      });
      return pre
    }, [])
    .filter((item) => item.pre === undefined);
};

const r = parse(['a/b', 'b/c/', 'h/a/e'])

console.log(r)
