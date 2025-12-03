/**
 * WordPress dependencies
 * https://developer.wordpress.org/block-editor/how-to-guides/format-api/2-toolbar-button/
 * https://github.com/gziolo/gutenberg-times/blob/master/src/index.js
 */
import { __ } from "@wordpress/i18n";
import { BlockControls } from "@wordpress/block-editor";
import { Popover, ToolbarGroup, ToolbarButton } from "@wordpress/components";
import {
	toggleFormat,
	removeFormat,
	registerFormatType,
	create,
	insert,
} from "@wordpress/rich-text";
import { useState } from "@wordpress/element";

const name = "bi-picker/icon";

const addIcon = ({ isActive, value, onChange, onFocus }) => {
	const [searchValue, setSearchValue] = useState("");

	const onClick = () => {
		if (isActive) {
			onChange(removeFormat(value, name));
			return;
		}

		onChange(toggleFormat(value, { type: name }));
	};

	const icons = JSON.parse(globalBootstrapIconToolbarData.iconFontSelection);

	return (
		<BlockControls>
			<ToolbarGroup>
				<ToolbarButton
					icon="info"
					label={__("Add Icon", "i-toolbar")}
					className="i-toolbar"
					onClick={onClick}
				/>
			</ToolbarGroup>

			{isActive && (
				<Popover
					headerTitle={__("Icons Popover", "i-toolbar")}
					animate={false}
				>
					<label id="i-toolbar-search">
						<i className={"bi bi-search"}></i>
						<input
							type="search"
							value={searchValue}
							onChange={(e) => setSearchValue(e.target.value)}
							placeholder={__("Filter...", "i-toolbar")}
							autoFocus
						/>
					</label>
					<div
						id="i-toolbar-menu"
						role="menu"
						className="components-dropdown-menu__menu"
					>
						{Object.keys(icons)
							.filter(
								(icon) =>
									icon.includes(searchValue) ||
									searchValue.length < 2
							)
							.map((icon) => (
								<button
									key={`button-${icon}`}
									title={icon}
									type="button"
									role="menu-item"
									className="components-button components-dropdown-menu__menu-item has-text has-icon"
									onClick={() => {
										onChange(
											insert(
												value,
												create({
													html: `<i class="bi bi-${icon}"></i> `,
												})
											)
										);
										onFocus();
									}}
								>
									<i className={`bi bi-${icon}`}></i>
									{icon}
								</button>
							))}
					</div>
				</Popover>
			)}
		</BlockControls>
	);
};

registerFormatType(name, {
	title: __("Icon", "i-toolbar"),
	tagName: "i",
	className: null,
	edit: addIcon,
});
