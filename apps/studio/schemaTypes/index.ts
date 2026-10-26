import navigation from './documents/navigation'
import page from './documents/page'
import project from './documents/project'
import siteSettings from './documents/siteSettings'

import socialLink from './objects/socialLink'
import {heroSection} from './objects/heroSection'
import {textSection} from './objects/textSection'
import {imageSection} from './objects/imageSection'
import {gallerySection} from './objects/gallerySection'
import gallery from './documents/gallery'
import {galleryImage} from './objects/galleryImage'
import {serviceSection} from './objects/serviceSection'
import projectsSection from './objects/projectsSection'
import {formField} from './objects/formField'
import form from './objects/form'
import {formSubmission} from './objects/formSubmission'
import formSection from './objects/formSection'
import {seoType} from './objects/seo'

export const schemaTypes = [
  siteSettings,
  navigation,
  page,
  project,
  gallery,
  heroSection,
  textSection,
  imageSection,
  gallerySection,
  galleryImage,
  serviceSection,
  projectsSection,
  formSection,
  form,
  formField,
  formSubmission,
  seoType,
  socialLink,
]
