/**
 * Retrieves the translation of text.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-i18n/
 */
import { __ } from '@wordpress/i18n';

/**
 * React hook that is used to mark the block wrapper element.
 * It provides all the necessary props like the class name.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-block-editor/#useblockprops
 */
import { useBlockProps, BlockControls } from '@wordpress/block-editor';
import { useState } from '@wordpress/element';
import {
	RangeControl,
	ToolbarButton,
	ToolbarGroup,
	Icon,
} from '@wordpress/components';

const { serverSideRender: ServerSideRender } = wp;
/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * Those files can contain any CSS code that gets applied to the editor.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */
import './editor.scss';

/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#edit
 *
 * @return {Element} Element to render.
 */
export default function Edit( { attributes, setAttributes } ) {
	const [ isPreview, setIsPreview ] = useState( false );
	const { postCount } = attributes;
	return (
		<div { ...useBlockProps() }>
			<BlockControls>
				<ToolbarGroup>
					{ isPreview && (
						<ToolbarButton
							icon={ <Icon icon="edit" /> }
							label="Edit"
							onClick={ () => {
								setIsPreview( false );
							} }
						/>
					) }
					{ ! isPreview && (
						<ToolbarButton
							icon={ <Icon icon="welcome-view-site" /> }
							label="Preview"
							onClick={ () => {
								setIsPreview( true );
							} }
						/>
					) }
				</ToolbarGroup>
			</BlockControls>
			{ isPreview && (
				<ServerSideRender
					block="latest-post-grid/latest-post-grid"
					attributes={ attributes }
				/>
			) }
			{ ! isPreview && (
				<div className="latest-post-grid-settings">
					<RangeControl
						label={ __( 'Number of Posts', 'latest-post-grid' ) }
						value={ postCount }
						onChange={ ( value ) =>
							setAttributes( { postCount: value } )
						}
						min={ 1 }
						max={ 14 }
						help={ __(
							'Select how many posts to display in the grid',
							'latest-post-grid'
						) }
					/>
				</div>
			) }
		</div>
	);
}
