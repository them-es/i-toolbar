<?php
/**
 * @package <i> Toolbar
 * @version 1.0.0
 *
 * @wordpress-plugin
 * Plugin Name: &lt;i&gt; Toolbar
 * Plugin URI: https://wordpress.org/plugins/i-toolbar
 * Description: A simple &lt;i&gt;con picker for rich-text blocks. Powered by Bootstrap Icons (MIT).
 * Version: 1.1.0
 * Author: them.es
 * Author URI: https://them.es/plugins/i-toolbar
 * Text Domain: i-toolbar
 * Domain Path: /languages
 * License: GPL-2.0+
 * License URI: https://www.gnu.org/licenses/gpl-2.0.txt
 */

// Exit if accessed directly.
defined( 'ABSPATH' ) || exit;


/**
 * Enqueue Frontend assets.
 * https://developer.wordpress.org/reference/functions/get_file_data/
 * https://developer.wordpress.org/reference/hooks/wp_enqueue_scripts/
 */
function i_toolbar_enqueue_assets() {
	$data = get_file_data( __FILE__, array( 'version' => 'Version' ), 'plugin' );

	// Enqueue styles.
	wp_enqueue_style(
		'i-toolbar-webfont',
		plugins_url( 'assets/bootstrap-icons/font/bootstrap-icons.css', __FILE__ ),
		array(),
		$data['version'],
		'all'
	);
}
add_action( 'wp_enqueue_scripts', 'i_toolbar_enqueue_assets' );


/**
 * Enqueue block editor assets.
 * https://developer.wordpress.org/reference/hooks/enqueue_block_editor_assets/
 */
function i_toolbar_enqueue_editor_assets() {
	$icon_font_selection = @file_get_contents( path_join( plugin_dir_path( __FILE__ ), 'assets/bootstrap-icons/font/bootstrap-icons.json' ) );
	// print_r( $icon_font_selection );
	if ( false === $icon_font_selection ) {
		$icon_font_selection = '{ "No icons found!": "" }';
	}

	$asset_file = include __DIR__ . '/blocks/build/index.asset.php';

	// Enqueue scripts.
	wp_enqueue_script(
		'i-toolbar-editor-script',
		plugins_url( 'blocks/build/index.js', __FILE__ ),
		$asset_file['dependencies'],
		$asset_file['version']
	);
	wp_localize_script(
		'i-toolbar-editor-script',
		'globalBootstrapIconToolbarData',
		array(
			'pluginRoot'        => esc_url( plugins_url( '', __FILE__ ) ),
			'iconFontSelection' => $icon_font_selection,
		)
	);

	// Load script translations: https://developer.wordpress.org/reference/functions/wp_set_script_translations/
	wp_set_script_translations( 'i-toolbar-editor-script', 'i-toolbar', plugin_dir_path( __FILE__ ) . '/languages/' );

	// Enqueue styles.
	wp_enqueue_style(
		'i-toolbar-editor-style',
		plugins_url( 'assets/admin/css/style-editor.css', __FILE__ ),
		array(),
		$asset_file['version']
	);
	wp_enqueue_style(
		'i-toolbar-webfont',
		plugins_url( 'assets/bootstrap-icons/font/bootstrap-icons.css', __FILE__ ),
		array(),
		$asset_file['version'],
		'all'
	);
}
add_action( 'enqueue_block_editor_assets', 'i_toolbar_enqueue_editor_assets' );
