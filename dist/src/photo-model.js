export const PHOTO_PHASES={solid:'고체',liquid:'액체',gas:'기체','solid-liquid':'고체·액체','not-specified':'상태 미기재'};
export const PHOTO_KINDS={sample:'실물 표본',micrograph:'현미경 표본',coating:'도금·증착',discharge:'방전광',radiation:'방사선 관측',tracks:'입자 궤적',encapsulated:'피복 시료',source:'형태 미기재 시료'};
export const isSpecimen=photo=>['sample','micrograph','coating'].includes(photo.kind);
export const hasSpecimen=element=>element.photos.some(isSpecimen);
export function matchesPhoto(element,filter){
 if(filter==='all')return true;
 if(filter==='photos')return element.photos.length>0;
 if(filter==='specimen')return hasSpecimen(element);
 if(filter==='observation')return element.photos.length>0&&!hasSpecimen(element);
 if(filter==='missing')return element.photos.length===0;
 return false;
}
export function photoCoverageLabel(element){
 if(hasSpecimen(element))return '표본 사진';
 if(element.photos.length)return '관측 자료';
 return element.photoReview.status==='source-pending'?'사진 원본 미확보':'벌크 표본 미확인';
}
