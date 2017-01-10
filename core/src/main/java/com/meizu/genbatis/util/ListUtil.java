package com.meizu.genbatis.util;


import java.util.ArrayList;
import java.util.LinkedHashSet;
import java.util.List;
import java.util.Set;

/**
 * 集合工具类
 * @author tengqingya
 * @date 2016-11-21 下午4:51:35
 */
public class ListUtil {

	public static final int size( List<?> list ) {
		if( ListUtil.isEmpty( list ) ) {
			return 0;
		}
		return list.size();
	}

	/**
	 * 
	 * 空判断
	 * 
	 * @param list
	 * @return list==null -> true , list.isEmpty()==true -> true,else false
	 */
	public static final boolean isEmpty( List<?> list ) {
		if( list == null || list.size() == 0 ) {
			return true;
		}
		return false;
	}

	public static final boolean isNotEmpty( List<?> list ) {
		return !ListUtil.isEmpty( list );
	}

	public static <T> List<T> defaultList( List<T> list ) {
		if( null == list ) {
			return new ArrayList<T>();
		}
		return list;
	}

	public static final boolean isEmpty( Set<?> set ) {
		if( set == null || set.size() == 0 ) {
			return true;
		}
		return false;
	}

	public static final String[] toArray( List<?> list ) {
		String[] arr = new String[ list.size() ];
		for( int i = 0; i < list.size(); i++ ) {
			arr[ i ] = String.valueOf( list.get( i ) );
		}
		return arr;
	}

	public static final List<Long> toLongList( Set<String> set){
		List<Long> list = new ArrayList<>();
		for( String s : set ){
			list.add(Long.valueOf(s));
		}
		return list;
	}

	public static final List<Integer> toIntegerList( Set<String> set){
		List<Integer> list = new ArrayList<>();
		for( String s : set ){
			list.add(Integer.valueOf(s));
		}
		return list;
	}

	public static <T> Set<T> toSet(List<T> list){
		Set<T> set = new LinkedHashSet<>();
		for( T t : list){
			set.add(t);
		}
		return set;
	}

	public static Set<Integer> toIntegerSet( List<String> list ){
		Set<Integer> set = new LinkedHashSet<>();
		for( String s : list ){
			set.add( Integer.parseInt(s) );
		}
		return set;
	}

	/**
	 * 合并list1,list2，并过滤重复的元素
	 * @param list1
	 * @param list2
	 * @param <T>
	 * @return
	 */
	public static <T> List<T> mergetAndFilter(List<T> list1, List<T> list2){
		List<T> result = new ArrayList<>();
		if( ListUtil.isNotEmpty(list1)){
			result.addAll(list1);
		}
		if( ListUtil.isNotEmpty(list2)){
			for( T t : list2 ){
				if( result.contains(t)){
					continue;
				}
				result.add(t);
			}
		}
		return result;
	}

}
