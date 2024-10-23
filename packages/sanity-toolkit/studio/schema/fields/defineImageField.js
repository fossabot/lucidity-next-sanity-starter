import { jsx as _jsx, jsxs as _jsxs } from 'react/jsx-runtime';
import { defineField } from 'sanity';
import { FaRegImage } from 'react-icons/fa';
import { IMAGE_FIT } from '../../constants/imageObjectField';
/**
 * Define an image field with alt text and optional caption and fit options.
 * Optionally wrap this in your own function to change the defaults, and use that across your app. This is recommended.
 *
 * The schema can be modified as follows (e.g. to change the field name and add a hidden key/value)
 *   fields: [
 *     defineField({
 *       ...defineImageField(),
 *       name: 'mediaImage',
 *       hidden: ({ parent }) => parent.mediaType !== 'image',
 *     }),
 *   ]
 *
 * The toolkit helper `sliceInFields()` can be used to insert fields into the field array, at the start, end, or after a specific field.
 * See: @pkg/sanity-toolkit/studio/schema/utilities/sliceInFields.ts
 */
export function defineImageField({
  name = 'image',
  withHotspot = true,
  withAiAssistAlt = true,
  withFit = true,
  withCaption = true,
  captionFieldType = 'text',
} = {}) {
  return defineField({
    title: 'Image',
    name,
    type: 'image',
    icon: FaRegImage,
    options: {
      hotspot: withHotspot,
      ...(withAiAssistAlt
        ? {
            aiAssist: {
              imageDescriptionField: 'alt', // See: https://www.sanity.io/docs/install-and-configure-sanity-ai-assist#a65bfa29260c
            },
          }
        : {}),
    },
    fields: [
      defineField({
        name: 'alt',
        type: 'string',
        title: 'Alt text',
        description:
          'Optional. For screen-readers. Leave blank if the image is purely decorative and holds no contextual information, or if caption is provided.',
      }),
      ...(withCaption
        ? [
            defineField({
              title: 'Caption',
              name: 'caption',
              type: captionFieldType,
              description:
                'Optional. Description of the image displayed on or under the image',
            }),
          ]
        : []),
      ...(withFit
        ? [
            defineField({
              name: 'fit',
              title: 'Image fit',
              type: 'string',
              description: _jsxs('details', {
                children: [
                  _jsx('summary', { children: 'What does this mean?' }),
                  'Choose whether you want to crop or shrink images to fit them into their box on the website. If cropped, the image may lose some of the content on its sides. If it shrinks, the entire image will always be visible, but extra spacing may be added on its sides.',
                ],
              }),
              options: {
                list: [
                  {
                    title: 'Crop - may cut off edges',
                    value: IMAGE_FIT.COVER,
                  },
                  {
                    title: 'Shrink - always see entire image',
                    value: IMAGE_FIT.CONTAIN,
                  },
                ],
                layout: 'radio',
              },
              initialValue: IMAGE_FIT.COVER,
            }),
          ]
        : []),
    ],
    preview: {
      select: {
        title: 'image.alt',
        media: 'image',
      },
    },
  });
}