/**
 * WordPress dependencies
 * https://developer.wordpress.org/block-editor/how-to-guides/format-api/2-toolbar-button/
 * https://github.com/gziolo/gutenberg-times/blob/master/src/index.js
 */
import {
	__,
	sprintf,
} from '@wordpress/i18n';
import {
	BlockControls,
} from '@wordpress/block-editor';
import {
	Popover,
	ToolbarGroup,
	ToolbarButton,
} from '@wordpress/components';
import {
	toggleFormat,
	removeFormat,
	registerFormatType,
	insert,
	create,
} from '@wordpress/rich-text';

const name = 'bi-picker/icon';

const addIcon = ( { isActive, value, onChange, onFocus } ) => {
	const onClick = () => {
		if ( isActive ) {
			onChange(
				removeFormat( value, name )
			);
			return;
		}

		onChange(
			toggleFormat( value, {
				type: name,
			} )
		);
	};

	const onSearch = () => {
		const searchValue = document.querySelector( '#i-toolbar-search input' ).value;
		//console.log( searchValue );

		document.querySelectorAll( '#i-toolbar-menu button' ).forEach( ( e ) => {
			if ( searchValue.length > 1 ) {
				if ( e.innerHTML.includes( searchValue ) ) {
					e.style.display = 'flex';
				} else {
					e.style.display = 'none';
				}
			} else {
				e.style.display = 'flex';
			}
		} );
	}

	return (
		<BlockControls>
			<ToolbarGroup>
				<ToolbarButton
					icon="info"
					label={ __( 'Add Icon', 'i-toolbar' ) }
					className="i-toolbar"
					onClick={ onClick }
				/>
			</ToolbarGroup>
			{
				isActive && (
					<Popover
						headerTitle={ __( 'Icons Popover', 'i-toolbar' ) }
						animate={ false }
					>
						<label id="i-toolbar-search">
							<i className={ 'bi bi-search' }></i> <input type="search" onKeyUp={ () => { onSearch() } } onChange={ () => { onSearch() } } placeholder={ __( 'Filter...', 'i-toolbar' ) } autoFocus />
						</label>
						<div id="i-toolbar-menu" role="menu" className="components-dropdown-menu__menu">
							{
								// Fetch JSON data from PHP
								Object.keys( JSON.parse( globalBootstrapIconToolbarData.iconFontSelection ) )
									.map( icon =>
										<button
											key={ 'button-' + icon }
											title={ icon }
											type="button"
											role="menu-item"
											className="components-button components-dropdown-menu__menu-item has-text has-icon"
											onClick={ () => {
												//console.log( icon );
												// Insert value
												onChange(
													insert(
														value,
														create( {
															html: '<i class="bi bi-' + icon + '"></i> ' // '[icon class="' + icon + '"]'
														} ),
													)
												);
												// Keep focus in RichText field
												onFocus();
											} }
										>
											<i className={ 'bi bi-' + icon }></i>
											{
												icon
											}
										</button>
								)
							}
						</div>
					</Popover>
				)
			}
		</BlockControls>
	);
};

registerFormatType( name, {
	title: 'Icon',
	tagName: 'i',
	className: null,
	edit: addIcon,
} );