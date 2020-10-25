//评测题目: 无

/**
 * 数组[ 'a/b', 'b/c/', 'h/a/e']  ，表示一个完整的目录结构下的子路径，实现一个方法找到这个目录的根节点。
 *
 */

[
  { key: a, pre: h, next: b },
  { key: b, pre: a, next: null },
  { key: c, pre: b, next: null },
];

const parse = function (array) {
  return array
    .reduce((pre, curr) => {
      const currArray = curr.split("/");
      currArray.forEach((el, index) => {
        let matFlag = true;
        pre.forEach((item) => {
          if (item.key == el) {
            item.pre = currArray[index - 1];
            item.next = currArray[index + 1];
          } else {
            matFlag = false;
          }
        });
        if (!matFlag) {
          pre.push({
            key: el,
            pre: currArray[index - 1],
            next: currArray[index + 1],
          });
          matFlag = true;
        }
      });
    }, [])
    .filter((item) => item.pre === undefined);
};
