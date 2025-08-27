<?php
/**
 * Plugin Name:       Latest Post Grid
 * Description:       Block that allows to display latest posts in a grid layout.
 * Author:            Albin Sadiku
 * Requires at least: 6.1
 * Requires PHP:      8.0
 * Version:           0.1.0
 */

if (!defined('ABSPATH')) {
    exit; // Exit if accessed directly.
}
define('LATEST_POST_GRID_BLOCK_PATH', realpath(plugin_dir_path(__FILE__)));
/**
 * Registers the block using the metadata loaded from the `block.json` file.
 * Behind the scenes, it registers also all assets so they can be enqueued
 * through the block editor in the corresponding context.
 *
 * @see https://developer.wordpress.org/reference/functions/register_block_type/
 */
add_action('init', fn() => register_block_type(__DIR__ . '/build'));