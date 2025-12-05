<?php
/**
 * Plugin Name: &lt;i&gt; Toolbar
 * Plugin URI: https://wordpress.org/plugins/i-toolbar
 * Description: A simple &lt;i&gt;con picker for rich-text blocks. Powered by Bootstrap Icons (MIT).
 * Version: 1.2.1
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
 * Enqueue block assets.
 * https://developer.wordpress.org/reference/hooks/enqueue_block_assets/
 *
 * @return void
 */
function i_toolbar_enqueue_editor_assets() {
	$asset_file = include __DIR__ . '/blocks/build/index.asset.php';

	if ( is_admin() && get_current_screen()->is_block_editor() ) {
		$icon_font_selection = @file_get_contents( path_join( plugin_dir_path( __FILE__ ), 'assets/bootstrap-icons/font/bootstrap-icons.json' ) );
		// print_r( $icon_font_selection );
		if ( false === $icon_font_selection ) {
			$icon_font_selection = '{ "No icons found!": "" }';
		}

		// Enqueue editor scripts.
		wp_enqueue_script(
			'i-toolbar-editor-script',
			plugins_url( 'blocks/build/index.js', __FILE__ ),
			$asset_file['dependencies'],
			$asset_file['version'],
			true
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

		// Enqueue editor styles.
		wp_enqueue_style(
			'i-toolbar-editor-style',
			plugins_url( 'assets/admin/css/style-editor.css', __FILE__ ),
			array(),
			$asset_file['version']
		);
	}

	// Enqueue frontend styles.
	wp_enqueue_style(
		'i-toolbar-webfont',
		plugins_url( 'assets/bootstrap-icons/font/bootstrap-icons.css', __FILE__ ),
		array(),
		$asset_file['version'],
		'all'
	);
}
add_action( 'enqueue_block_assets', 'i_toolbar_enqueue_editor_assets' );
