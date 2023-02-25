import consts from "@/consts/const";
import noImage from '@/assets/images/no_image.jpg'
import defaultPerson from '@/assets/images/person.jpg'

export function getPersonImageUrl(url) {
  if(url && url.substring(0,4) == 'http') return url
  return url ? `${consts.IMG_DOMAIN}/${url}` : defaultPerson
}

export function getPersonThumbnailImageUrl(url) {
  if(url && url.substring(0,4) == 'http') return url
  return url ? `t_${consts.IMG_DOMAIN}/${url}` : defaultPerson
}

export function getImageUrl(url) {
  if(url && url.substring(0,4) == 'http') return url
  return url ? `${consts.IMG_DOMAIN}/${url}` : noImage
}

export function getThumbnailImageUrl(url) {
  if(url && url.substring(0,4) == 'http') return url
  return url ? `t_${consts.IMG_DOMAIN}/${url}` : noImage
}
