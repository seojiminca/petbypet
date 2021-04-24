/**
 * 리뷰 점수를 얼굴 이미지로 변환
 *
 * @param rate  리뷰 점수(1: GOOD, 2: SOSO, 3: BAD)
 */
function getFaceImage(rate) {
  if(rate === 1) return '😄';
  if(rate === 2) return '🙂';
  if(rate === 3) return '😣';
  return "X";
}


/**
 * get Age from string type DOB value (2018-09-01T00:00:00.000Z) 
 *
 * @param DOB   DOB string
 */
function getAge(DOB) {
  const dobArr = DOB.slice(0,10).split('-').map(v => parseInt(v));
  const dobObj =  new Date(dobArr[0], dobArr[1]-1, dobArr[2]);
  return Math.floor((new Date() - dobObj) / 1000 / 60 / 60 / 24 / 365);
}

export { getFaceImage, getAge };