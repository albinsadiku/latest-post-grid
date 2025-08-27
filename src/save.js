/**
 * React hook that is used to mark the block wrapper element.
 * It provides all the necessary props like the class name.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-block-editor/#useblockprops
 */
import { useBlockProps } from '@wordpress/block-editor';

/**
 * The save function defines the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is saved.
 *
 * @return {Element} Element to render.
 */
export default function Save({ attributes }) {
	const blockProps = useBlockProps.save();
	const postCount = attributes.postCount || 4;

	return (
		<div {...blockProps}>
			<div 
				className="latest-post-grid" 
				data-post-count={postCount}
			>
				<div className="loading-message">
					<p>Loading posts...</p>
				</div>
			</div>
		</div>
	);
}
